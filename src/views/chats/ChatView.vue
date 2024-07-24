<template>
    <div class="border border-1 border-gray-800 px-4 py-3 text-white font-bold text-xl">Messages</div>
    <div class="w-full flex">
        <div class="w-0 sm:w-4/12 h-screen flex flex-col py-4 px-2 gap-2 text-white border-x border-1 border-gray-800">
            <div class="py-2 text-center cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300"
                :class="{ 'bg-white text-darkBlue font-bold scale-105': publicConvoIsActive }"
                @click="toggleGroupChat">
                HIVYE Group
            </div>
            <div class="py-2 text-center cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300"
                :class="{ 'bg-white text-darkBlue font-bold scale-105': privConvoIsActive }"
                @click="togglePrivConvo">
                Health Administrator
            </div>
        </div>
        <div class="w-full sm:w-8/12 h-screen text-white">
            <div v-if="hideChats">hidden</div>
            <GroupChat v-if="publicConvoIsActive" />
            <DirectChat v-if="privConvoIsActive" />
        </div>
    </div>
    
</template>

<script>
import GroupChat from './groupChat.vue';
import DirectChat from './directChat.vue';
export default{
    components: {
        GroupChat,
        DirectChat
    },
    data(){
        return{
            hideChats: true,
            publicConvoIsActive: false,
            privConvoIsActive: false,
        }
    },
    methods: {
        toggleGroupChat(){
            this.publicConvoIsActive = true;
            this.privConvoIsActive = false;   
            this.hideChats = false;     
        },
        togglePrivConvo(){
            this.publicConvoIsActive = false;
            this.privConvoIsActive = true;
            this.hideChats = false;
        }
    }
}
</script>