<template>
    <div v-if="post" class="text-white">
        <router-link :to="{ name: 'forum' }" class="fixed rounded-full p-2 m-3 hover:bg-hover text-white z-10">
            <BackButton />
        </router-link>
        <div class="flex flex-row">
            <section class="forum_section">
                <div class="flex flex-col w-full border-gray-700">
                    <!-- header -->
                    <div class="flex flex-row w-full items-center px-8 pt-4 mt-[50px]">
                        <h1 class="font-bold text-xl">{{ post.display_name }}</h1>
                        <span class="ml-auto">{{ formatDate(post.date) }}</span>
                    </div>
                    <div class="flex flex-row w-full items-center px-8 text-gray-400">
                        <h1 class="font-bold text">@{{ post.username }}</h1>
                        <span class="ml-auto">{{ formatTimestamp(post.time) }}</span>                        
                    </div>
                    <!-- post content -->
                    <div class="flex w-full items-center text-left px-8 py-4 text-2xl">
                        {{ post.post_content }}
                    </div>
                    <!-- interactions and metrics -->
                    <div class="flex flex-row w-full gap-4 px-8 items-center mb-4">
                        <!-- like -->
                    
                        <!-- for like button kaso di ko pa naayos -->
                        <div v-if="!dataLoaded" class="flex items-center cursor-pointer gap-1 hover:text-matcha" id="likeBtn" @click="handleItemLike(post)">
                            <!-- <unlikedButton v-if="!user_liked[post]" /> -->
                            <likedButton />
                            <!-- calculate the length of likes obj -->
                            <span>{{Object.keys(post.likes).length - 1}} likes</span>
                        </div>
                        <!-- comment icon den -->
                        <div class="flex items-center cursor-pointer gap-1 hover:text-matcha" id="commentBtn" @click="display_comment_prompt">
                            <CommentButton />
                            <!--<i class="fas fa-comment fa-xl"></i>-->
                            <span>Comment</span>
                        </div>
                    </div>
                    <!-- comment section -->
                    <!-- comments -->
                    <div v-if="comment_prompt_is_visible" class="w-11/12 mx-auto my-4 flex flex-row gap-2">
                        <input type="textarea" class="w-full rounded-lg py-1 px-2 bg-darkBlue text-xl focus:border-none focus:outline-none" placeholder="Enter comment..." v-model="comment_content" @input="send_comment_button">
                        <button @click="post_comment" v-if="commentHasValue" class="px-2 ml-1 rounded-lg bg-matcha">Send</button>
                    </div>
                    <div>
                    </div>
                    <!-- <div v-if="post.comments.user" class="w-11/12 mx-auto mt-1 mb-4 flex flex-row gap-2">
                        <input type="textarea" class="w-full rounded-lg py-1 px-2 bg-darkBlue" placeholder="Enter comment...">
                        <button class="px-2 ml-1 rounded-lg bg-matcha">Send</button>
                    </div> -->
                </div>
                <div class="flex flex-col w-full border-gray-700 border-y border-1 border-gray-700" v-for="comment in Object.keys(post.comments)" :key="comment"> 
                    <!-- exclude user: null which was initialized once user uploaded a post -->
                    <div v-if="comment != 'user'" class="my-4">
                            <!-- for anon comments
                            <div v-if="comment['post_status'] === true">Anonymous Member</div>
                            <div v-else>{{ comment['user'] }}</div> -->
                            <div class="flex flex-row w-full items-center px-8">
                                <h1 class="font-bold text-lg">{{ post.comments[comment]['name']}}</h1>
                                <span class="ml-auto text-md">{{ formatDate(post.comments[comment]['date']) }}</span>
                            </div>
                            <div class="flex flex-row w-full items-center px-8 text-gray-400">
                                <h1 class="font-bold text-md">@{{ post.comments[comment]['username'] }}</h1>
                                <span class="ml-auto text-sm">{{ formatTimestamp(post.comments[comment]['time']) }}</span>                        
                            </div>
                 
                        <div class="flex flex-col w-full px-8 pt-2 text-xl">{{ post.comments[comment]['comment']}}</div>
                        <!-- del option for user comment 
                        <span v-if="comment['user'] == username" class="del_comment" @click="delete_comment(commentid, postid)">
                            delete
                        </span></div>-->
                    </div>
                </div>
            </section>

            <section class="side_content border-l border-1 border-gray-700 fixed right-0 h-screen text-white transition-linear duration-1000">
                <Helpline_mobile />
            </section>
        </div>
    </div>
    <QuizButton />
</template>

<script setup>
import likedButton from '@/components/icons/like.vue';
import unlikedButton from '@/components/icons/unlike.vue';
import CommentButton from '@/components/buttons/commentButton.vue';
import BackButton from '@/components/buttons/backButton.vue';
import Helpline_mobile from './Helpline_mobile.vue';
import QuizButton from '@/components/buttons/QuizButton.vue';
import { onMounted, onUnmounted, ref as vue_ref } from 'vue';
import { HIVYE_database } from '@/main';
import { ref as firebase_ref, off, onValue } from 'firebase/database';
import { useRoute } from 'vue-router';
import { formatDate, formatTimestamp } from '@/scripts/dateAndTime';
import { useUserStore } from '@/stores/user';

const comment_prompt_is_visible = vue_ref(false);
const comment_content = vue_ref("");
const commentHasValue = vue_ref(false);

const route = useRoute();
const post_id = route.params.id;
const post = vue_ref(null);

const userStore = useUserStore();
const user_ID = userStore.user_id;

const fetchData = async () => {
    const post_ref = firebase_ref(HIVYE_database, 'posts/' + post_id)

    onValue(post_ref, (snapshot) => {
        post.value = snapshot.val();
        // console.lag('content:', post.value)
    }, (error) => {
        console.error('Read failed:', error);
    });

    return post_ref;
}

const post_comment = async () => {


}

const display_comment_prompt = async () => {
    comment_prompt_is_visible.value = !comment_prompt_is_visible.value
}


const send_comment_button = () => {
    if(comment_content.value){
        commentHasValue.value = true
    }
    if(comment_content.value === ""){
        commentHasValue.value = false
    }
}

let post_reference

onMounted(async () => {
    // console.lag('id:', post_id)
    post_reference = await fetchData();
    // console.lag('ref: ', post_reference)
});

onUnmounted(() => {
    if(post_reference){
        off(post_reference)
    }
})

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