<template>
    <div class="flex flex-row">
        <section class="forum_section">
            <div class="text-white w-full py-2 px-4 text-lg text-center border-b border-gray-700 border-1">
                For You
            </div>
            <!-- forum space -->
            <div id="flex flex-col h-auto" v-if="dataLoaded">
                <!-- post prompt -->
                <div class="flex flex-col h-auto w-11/12 my-8 mx-auto"> 
                    <textarea class="min-h-[20px] resize-none overflow-y-hidden py-2 px-4 my-2 text-white bg-transparent text-left border-none text-xl focus:border-none focus:outline-none" ref="post_textarea" rows="1" placeholder="Start a discussion here..." v-model="post" @input="adjustTextarea"></textarea>
                    
                    <div v-if="post_buttons" class="flex flex-row w-auto ml-auto gap-2 items-center">
                        <button class="flex rounded-full shadow-lg py-1 px-2 text-black bg-accentRed border border-2 border-red-700"
                            :class="{ 'bg-matcha text-black border border-2 border-green-700': anonymous }"
                            @click="anonymous==true">
                            Anonymous
                        </button>
                        <button class="py-1 px-4 rounded-full shadow-lg bg-white flex text-darkblue hover:bg-matcha">
                            Post
                        </button>
                    </div>
                </div>

                <Postcard />
            </div>
        </section>
        <section class="side_content fixed border-l border-1 border-gray-700  right-0 h-screen text-white transition-linear duration-1000">
            <div class="text-white w-full py-4 text-lg flex flex-row items-center">
                <div class="w-1/2 text-center cursor-pointer"
                    :class="{ 'sideHeadBorder' : helplineActive }"
                    @click="openHelpineCenter">Helplines</div>
                <div class="w-1/2 text-center cursor-pointer"
                    :class="{ 'sideHeadBorder' : testingActive }"
                    @click="openTestingCenter">Testing Centers</div>
            </div>
            <Helplines v-if="helplineActive"/>
            <TestingCenters v-if="testingActive"/>
        </section>
    </div>

    <QuizButton />
</template>
<script>
import Helplines from './Helplines.vue';
import TestingCenters from './TestingCenters.vue';
import QuizButton from '@/components/buttons/QuizButton.vue';
import Postcard from '@/components/posts_components/postcard.vue';
import header from '../../components/navigations/header.vue'; 
export default{
    components: {
        header,
        Postcard,
        Helplines,
        TestingCenters,
        QuizButton
    },
    data(){
        return {
           dataLoaded: true,
           helplineActive: true,
           testingActive: false,
           anonymous: false,
           post_buttons: false,
        }
    },
    methods: {
        openHelpineCenter(){
            if(this.helplineActive == false){
                this.helplineActive = true;
                this.testingActive = false;
            }
        },
        openTestingCenter(){
            if(this.testingActive == false){
                this.helplineActive = false;
                this.testingActive = true;
            }
        },
        adjustTextarea(){
            const textarea = this.$refs.post_textarea;

            if(textarea){
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
                this.post_buttons = true
            }
            if (textarea.value.trim() === '') {
                textarea.style.height = 'auto';
                this.post_buttons = false;
            }
        },
    },
    mounted(){
    }
}
</script>
<style scoped>
.forum_section{
    width: calc(100% - 402px);
    z-index: 1;
}
.side_content{
    width: 400px;
}
.sideHeadBorder{
    border-bottom: 3px solid white;
    font-weight: bold;
    padding-bottom: 5px;
}
/* container ng displayed posts */

@media (max-width: 1024px) {
    .side_content{
        display: none;
    }
    .forum_section{
        width: 100%;
    }
}


</style>