<template>
    <div class="flex w-full h-screen flex flex-col">
        <div class="msg_bar bg-darkBlue border border-1 border-gray-800 px-4 py-3 text-white font-bold text-xl">Messages</div>
        <div class="w-full flex flex-col sm:flex-row sm:flex-grow flex">
            <div class="chat_nav fixed top-0 right-7 sm:right-0 sm:top-0 sm:relative w-1/12 sm:w-4/12 h-1/12 scale-115 sm:scale-100 sm:h-full flex border-1 sm:flex-col py-2 sm:py-4 gap-2 text-white border-0 sm:border-x border-1 border-gray-800 mx-16 sm:mx-0">
                <div class="chat_icon sm:py-4 sm:px-8 p-2 cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300 flex flex-row gap-4 mx-2 sm:rounded-lg rounded-3xl"
                    :class="{ 'bg-gray-800 font-bold': publicConvoIsActive }"
                    @click="toggleGroupChat">
                    <svg-icon type="mdi" :path="groupIcon"></svg-icon>
                    
                    <span class="hidden sm:block">HIVYE Group</span>
                    
                </div>
                <div class="chat_icon sm:py-4 sm:px-8 p-2 cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300 flex flex-row gap-4 mx-2 sm:rounded-lg rounded-3xl "
                    :class="{ 'bg-gray-800 font-bold': privConvoIsActive }"
                    @click="togglePrivConvo">
                    <svg-icon type="mdi" :path="dmIcon"></svg-icon>
                    <span class="hidden sm:block">Health Administrator</span>
                </div>
            </div>
            <!-- for web -->
            <div class=" sm:w-8/12 w-full h-auto bottom-12 sm:bottom-1 sm:relative absolute text-white flex justify-center items-center sm:inline-block">
                <div v-if="hideChats" class="flex w-full mx-auto bg-red">select a conversation</div>
                <GroupChat class="" v-if="publicConvoIsActive" />
                <DirectChat v-if="privConvoIsActive" />
            </div>
        </div>
    </div>
    
    
</template>
  
<script>
import GroupChat from './groupChat.vue';
import DirectChat from './directChat.vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup } from '@mdi/js';
import { mdiDoctor } from '@mdi/js';
export default{
    components: {
        GroupChat,
        DirectChat,
        SvgIcon
    },
    data(){
        return{
            hideChats: true,
            publicConvoIsActive: false,
            privConvoIsActive: false,

            groupIcon: mdiAccountGroup,
            dmIcon: mdiDoctor,
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

<style scoped>
.msg_bar{
    z-index: 2;
}
.chat_nav{
    z-index: 3;
}
.chat_icon{
    z-index: 4;
}
</style>