<template>
    <div id="chat-container" class="relative w-full h-full flex flex-col">
      <!-- Chatbox (Scrollable) -->
      <div id="chatbox" class="flex h-auto flex-col-reverse overflow-y-scroll py-4 px-6 sm:mb-0 mb-12">
        <div v-for="(message, key) in messages.slice().reverse()"
          :key="key"
          class="my-2 flex flex-col w-auto">
            <template v-if="message.sender === sender">
                <div class="relative border-box inline ml-auto flex">
                  <deleteButton @click="deleteMessage(message.key)" class="m-2" />
                  <div class="py-2 px-3 rounded-xl bg-blue-700 border border-1 border-gray-600 mt-1 mb-2 inline-block max-w-max">{{ message.msg }}</div>
                </div>
            </template>
            <template v-else>
              <!-- <div class="sender">{{ message.sender }}</div> -->
              <div class="text-sm ml-1 text-white">{{ message.sender }}</div>
              <!-- <div class="sep">{{ message.msg }}</div> -->
              <div class="py-2 px-3 rounded-xl bg-gray-700 border border-1 border-gray-600 mt-1 mb-2 inline-block max-w-max">{{ message.msg }}</div>
              <!-- <div class="text-xs">{{ message.date }}</div> -->
            </template>
        </div>
      </div>
      <!-- Message Prompt -->
      <div id="message-prompt" class="absolute sm:bottom-1 bottom-0 left-0 right-0 flex flex-row justify-center items-center px-4 py-2 border-t border-1 border-gray-700 bg-darkBlue">
        <textarea id="msgTxt" v-model="newMessage" class="resize-none w-10/12 rounded-lg p-2 max-h-10 bg-transparent border-none overflow-y-auto focus:border-none focus:outline-none" placeholder="Type your message..."></textarea>
        <button @click="sendMessage" :disabled="!newMessage" :class="['w-2/12 ml-4  text-white rounded-lg p-2 hover:bg-gray-600', newMessage ? 'bg-matcha': 'bg-gray-600']">Send</button>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import deleteButton from '@/components/icons/delete.vue';
import { HIVYE_database as db } from "@/main";
import { ref as db_ref, set } from 'firebase/database';
import { onChildAdded, onChildRemoved, remove } from 'firebase/database';
import { useUserStore } from '@/stores/user';

const messages = ref([]);
const newMessage = ref(null)

const userStore = useUserStore();
// const sender = userStore.username;
const sender = userStore.username;
const sender_id = userStore.user_id;

onMounted(() => {
    const chatContainer = document.getElementById('chat-container');
    const chatbox = document.getElementById('chatbox');
    const messagePrompt = document.getElementById('message-prompt');

    const observer = new MutationObserver(() => {
      if (chatbox.scrollHeight > chatContainer.clientHeight - messagePrompt.clientHeight) {
        chatContainer.classList.add('expand-upward');
      } else {
        chatContainer.classList.remove('expand-upward');
      }
    });

    observer.observe(chatbox, { childList: true, subtree: true });
})
  
// TO RECEIVE MSG
onChildAdded(db_ref(db, "oneMessage/" + sender), (data) => {
    messages.value.push({
        key: data.key,
        sender: data.val().sender,
        msg: data.val().msg,
    });
});

// TO DELETE MSG
const deleteMessage = (key) => {
  remove(db_ref(db, "oneMessage/" + sender +"/" +key))
    .then(() => {
      // Remove the deleted message from the local array
      const index = messages.value.findIndex((msg) => msg.key === key);
      if (index !== -1) {
        messages.value.splice(index, 1);
      }
    })
    .then(() => {
        // remove 1on1 msg interaction
        remove(db_ref(db, "users/" + sender_id.value + "/interactions/oneMessage/" +key))
    })
    .catch((error) => {
      console.error('Error deleting message:', error);
    });
};


// WHEN MSG IS DELETED
onChildRemoved(db_ref(db, "oneMessage/" + sender), (data) => {
  const key = data.key;
  // Remove the deleted message from the local array
  const index = messages.value.findIndex((msg) => msg.key === key);
  if (index !== -1) {
    messages.value.splice(index, 1);
  }
});
const sendMessage = () => {
    const msgTxt = document.getElementById("msgTxt");
    const msg = msgTxt.value;
    const timestamp = new Date().getTime();

    set(db_ref(db, "oneMessage/" + sender + "/" + timestamp), {
        msg: msg,
        sender: sender
    }).then(() => {
        // record groupchat interaction
        set(db_ref(db, "users/"+sender_id.value+"/interactions/oneMessage/"+ timestamp), {
        msg: msg,
        })
    })

    msgTxt.value = "";
    newMessage.value = null;
};
</script>
    
<!-- methods: {
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          this.fetched_chats.unshift({
            id: Date.now(),
            user: 'Me',
            chat: this.newMessage,
            date: new Date().toISOString().split('T')[0],
          });
          this.newMessage = '';
          this.$nextTick(() => {
            const chatbox = document.getElementById('chatbox');
            chatbox.scrollTop = 0; // Scroll to the top of the chatbox
          });
        }
      }, -->
  
<style>
/* Custom CSS for upward expansion */
#chat-container.expand-upward #chatbox {
  bottom: 0;
  top: auto;
}
#chatbox{
  max-height: calc(100vh - 115px);
}
#message-prompt{
  height: 60px;
}
</style>