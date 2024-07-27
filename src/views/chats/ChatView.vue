<template>
    <div class="flex w-full h-screen flex flex-col">
        <div class="border border-1 border-gray-800 px-4 py-3 text-white font-bold text-xl">Messages</div>
        <div class="w-full flex flex-grow">
            <div class="w-0 sm:w-4/12 flex flex-col py-4 gap-2 text-white border-x border-1 h-full border-gray-800">
                <div class="py-4 px-8 cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300 flex flex-row gap-4 "
                    :class="{ 'bg-gray-600 font-bold': publicConvoIsActive }"
                    @click="toggleGroupChat">
                    <svg-icon type="mdi" :path="groupIcon"></svg-icon>
                    
                    <span>HIVYE Group</span>
                    
                </div>
                <div class="py-4 px-8 cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300 flex flex-row gap-4 "
                    :class="{ 'bg-gray-600 font-bold': privConvoIsActive }"
                    @click="togglePrivConvo">
                    <svg-icon type="mdi" :path="dmIcon"></svg-icon>
                    <span>Health Administrator</span>
                </div>
            </div>
            <div class="w-full sm:w-8/12 text-white flex justify-center items-center">
                <div v-if="hideChats">select a conversation</div>
                <GroupChat v-if="publicConvoIsActive" />
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