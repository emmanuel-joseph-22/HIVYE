<template>
    <div v-if="post">
        <router-link :to="{ name: 'forum' }" class="fixed rounded-full p-2 m-3 hover:bg-gray-700 text-white z-10">
            <BackButton />
        </router-link>
        <div class="flex flex-row">
            <section class="forum_section">
                <div class="flex flex-col w-full border-gray-700 text-white">
                    <!-- header -->
                    <div class="flex flex-row w-full items-center px-8 pt-4 mt-[50px]">
                        <h1 class="font-bold text">{{ post.userName }}</h1>
                        <span class="ml-auto">{{ post.datePosted }}</span>
                    </div>
                    <!-- post content -->
                    <div class="flex w-full items-center text-left px-8 py-1">
                        {{ post.postContent }}
                    </div>
                    <!-- interactions and metrics -->
                    <div class="flex flex-row w-full gap-2 px-4 items-center my-2">
                        <!-- like -->
                        <likeButton />
                        <!-- comments -->
                    </div>
                    <!-- comment section -->
                    <div v-if="post.commentPrompt" class="w-11/12 mx-auto mt-1 mb-4 flex flex-row gap-2">
                        <input type="textarea" class="w-full rounded-lg py-1 px-2 bg-darkBlue" placeholder="Enter comment...">
                        <button class="px-2 ml-1 rounded-lg bg-matcha">Send</button>
                    </div>
                </div>

                <div class="comment_section" v-for="commentid in Object.keys(comments_container)" :key="commentid"> 
                    <!-- exclude user: null which was initialized once user uploaded a post -->
                    <span v-if="commentid != 'user'">
                        <div class="comment_div"> 
                            <!-- for anon comments -->
                            <div v-if="comments_container[commentid]['post_status'] === true">Anonymous Member</div>
                            <div v-else>{{ comments_container[commentid]['user'] }}</div>
                            <div>{{ comments_container[commentid]['comment']}}</div>
                        </div>
                            <div class="comment_timestamp">{{ comments_container[commentid]['date']}}<span> | {{  comments_container[commentid]['time']  }}</span>
                            <!-- del option for user comment -->
                            <span v-if="comments_container[commentid]['user'] == username" class="del_comment" @click="delete_comment(commentid, postid)">
                                delete
                            </span></div>
                    </span>
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
    </div>
</template>

<script>
import BackButton from '@/components/buttons/backButton.vue';
import Helplines from './Helplines.vue';
import TestingCenters from './TestingCenters.vue';
import QuizButton from '@/components/buttons/QuizButton.vue';
import { ref } from 'vue';

export default{
    components: {
        BackButton,
        Helplines,
        TestingCenters,
        QuizButton
    },
    setup(){
        const helplineActive = ref(true);
        const testingActive = ref(false);
        const openHelpineCenter = () => {
            if(helplineActive.value == false){
                helplineActive.value = true;
                testingActive.value = false;
            }
        };
        const openTestingCenter = () => {
            if(testingActive.value == false){
                helplineActive.value = false;
                testingActive.value = true;
            }
        };
        const post = ref({
            userName: 'username',
            datePosted: '10-01-2024',
            postContent: 'null',
            comments: [
                {
                    userName: null,
                    dateCommented: null,
                    comment: ''
                },
                {
                    userName: null,
                    dateCommented: null,
                    comment: ''
                },
                {
                    userName: null,
                    dateCommented: null,
                    comment: ''
                }
            ]
        });

        return{
            post,
            helplineActive,
            testingActive,
            openHelpineCenter,
            openTestingCenter
        }
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