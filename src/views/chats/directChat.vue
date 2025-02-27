<template>
    <div id="chat-container" class="relative w-full h-full flex flex-col">
      <!-- Chatbox (Scrollable) -->
      <div id="chatbox" class="flex flex-col-reverse overflow-y-scroll py-4 px-6">
        <div v-for="message in fetched_chats"
          :key="message.id"
          class="my-2 flex flex-col w-auto">
          <div class="text-sm ml-1">{{ message.user }}</div>
          <div class="py-2 px-3 rounded-xl bg-gray-700 border border-1 border-gray-600 mt-1 mb-2 inline-block max-w-max">{{ message.chat }}</div>
          <div class="text-xs">{{ message.date }}</div>
        </div>
      </div>
      <!-- Message Prompt -->
      <div id="message-prompt" class="absolute bottom-1 left-0 right-0 flex flex-row justify-center items-center px-4 py-2 border-t border-1 border-gray-700 bg-darkBlue">
        <textarea v-model="newMessage" class="w-10/12 rounded-lg p-2 max-h-10 bg-transparent border-none overflow-y-auto focus:border-none focus:outline-none" placeholder="Type your message..."></textarea>
        <button @click="sendMessage" class="w-2/12 ml-4 bg-matcha text-white rounded-lg p-2 hover:bg-gray-600">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
        fetched_chats: [
          // Example messages
          { id: 1, user: 'health admin', chat: 'di pa nakakabit backend', date: '2024-07-25' },
        ],
      };
    },
    mounted() {
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
    },
    methods: {
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
      },
    },
  };
  </script>
  
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