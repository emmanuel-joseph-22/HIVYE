<template>
    <div class="flex flex-row">
        <section class="forum_section border-x border-1 border-gray-700">
            <div class="text-white w-full py-2 px-4 text-lg text-center border-b border-gray-700 border-1">
                Forum
            </div>
            <!-- forum space -->
            <div id="flex flex-col h-auto" v-if="dataLoaded">
                <!-- post prompt -->
                <div class="flex flex-col h-auto w-11/12 my-8 mx-auto"> 
                    <textarea class="discussion_box" ref="post_textarea" rows="1" placeholder="Start a discussion here..." v-model="post" @input="adjustTextarea"></textarea>
                    <!-- img upload soon : will be visible if user entered something on the text area 
                    <div v-if="img_post_buttons" class="post_buttons">
                        <div class="add_photo">
                            <label for="fileInput" class="file-label">
                                add file
                            </label>
                            <input type="file" id="fileInput" ref="uploaded_image" class="file-type-hidden" accept="image/*">
                        </div>
                        <button @click="toggleButton('newpost')" :class="{ active: anonymous['newpost'], inactive: !anonymous['newpost'] }" id="toggle_button">Anonymous</button>
                        <button id="post_button" class="regular_buttons" @click="submit_post" type="submit">Post</button>
                    </div>-->
                    
                    <!-- <div v-if="imageUrl">
                        <h3>Uploaded Image:</h3>
                        <img :src="imageUrl" alt="Uploaded Image">
                    </div> -->
                    <div class="flex flex-row w-auto ml-auto gap-2 items-center">
                        <button class="flex rounded-full shadow-lg bg-red-400 py-1 px-2 text-white"
                            :class="{ '': active, inactive}">
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
        <section class="side_content fixed right-0 h-screen text-white transition-linear duration-1000">
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
</template>
<script>
import Helplines from './Helplines.vue';
import TestingCenters from './TestingCenters.vue';
import Postcard from '@/components/posts_components/postcard.vue';
import header from '../../components/navigations/header.vue'; 
export default{
    components: {
        header,
        Postcard,
        Helplines,
        TestingCenters
    },
    data(){
        return {
           dataLoaded: true,
           helplineActive: true,
           testingActive: false,
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
        }
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
    #posting{
        width: 100vw;
    }
    .post-container{
        width: 100%;
        max-width: 100%;
    }
}
/* textarea */
.discussion_box{
    min-height: 20px;
    resize: none;
    overflow-y: hidden;
    padding: 10px;
    color: white;
    background-color: #ffffff00;
    text-align: left;
    cursor: pointer;
}

</style>