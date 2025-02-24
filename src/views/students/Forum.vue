<template>
    <div class="flex flex-row">
        <section class="forum_section mb-[50px]">
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
        <section class="side_content fixed border-l border-1 border-gray-700 right-0 h-screen text-white transition-linear duration-1000">
            <Helpline_mobile />
        </section>
    </div>

    <QuizButton />
</template>
<script>
import QuizButton from '@/components/buttons/QuizButton.vue';
import Postcard from '@/components/posts_components/postcard.vue';
import header from '../../components/navigations/header.vue'; 
import Helpline_mobile from './Helpline_mobile.vue';
export default{
    components: {
        header,
        Postcard,
        Helpline_mobile,
        QuizButton
    },
    data(){
        return {
           dataLoaded: true,
           anonymous: false,
           post_buttons: false,
        }
    },
    methods: {
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
    z-index: 2;
}
@media (max-width: 1024px) {
    .side_content{
        display: none;
    }
    .forum_section{
        width: 100%;
    }
}

.sideHeadBorder{
    border-bottom: 3px solid white;
    font-weight: bold;
    padding-bottom: 5px;
}

</style>