<template>
    <div class="flex w-full h-screen flex flex-col z-40 fixed">
        <div class="flex flex-row border-y border-1 border-gray-800 px-2 py-3 text-white font-bold text-xl items-center">
            <!-- Back button -->
            <router-link :to="{ name: 'forum' }" class="rounded-full p-2 mr-2 hover:bg-gray-700 block sm:hidden">
                <BackButton />
            </router-link>
            Messages
            <div class="flex gap-4 ml-auto mr-1 block sm:hidden">
                <svg-icon type="mdi" :path="groupIcon" @click="toggleGroupChat" class="cursor-pointer"></svg-icon>
                <svg-icon type="mdi" :path="dmIcon" @click="togglePrivConvo" class="cursor-pointer"></svg-icon>
            </div>
        </div>
        <div class="w-full flex flex-grow">
            <div class="hidden sm:inline-block flex border-1 flex-col py-4 gap-2 text-white border-x border-1 h-full border-gray-800">
                <div class="py-4 px-8 cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300 flex flex-row gap-4"
                    :class="{ 'bg-gray-600 font-bold': publicConvoIsActive }"
                    @click="toggleGroupChat">
                    <svg-icon type="mdi" :path="groupIcon"></svg-icon>
                    
                    <span>HIVYE Group</span>
                    
                </div>
                <div class="py-4 px-8 cursor-pointer hover:text-darkBlue hover:bg-gray-400 transition duration-300 flex flex-row gap-4"
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
import BackButton from '@/components/buttons/backButton.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup } from '@mdi/js';
import { mdiDoctor } from '@mdi/js';
export default{
    components: {
        GroupChat,
        DirectChat,
        BackButton,
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