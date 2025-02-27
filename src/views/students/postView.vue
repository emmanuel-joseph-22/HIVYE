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
                    <div class="flex flex-row w-full gap-2 px-4 items-center my-2">
                        <!-- like -->
                        <likeButton />
                        <!-- comments -->
                    </div>
                    <!-- comment section -->
                    <!-- <div v-if="post.comments.user" class="w-11/12 mx-auto mt-1 mb-4 flex flex-row gap-2">
                        <input type="textarea" class="w-full rounded-lg py-1 px-2 bg-darkBlue" placeholder="Enter comment...">
                        <button class="px-2 ml-1 rounded-lg bg-matcha">Send</button>
                    </div> -->
                </div>

                <!-- <div class="comment_section" v-for="commentid in Object.keys(comments_container)" :key="commentid"> 
                     exclude user: null which was initialized once user uploaded a post
                    <span v-if="commentid != 'user'">
                        <div class="comment_div"> 
                            for anon comments
                            <div v-if="comments_container[commentid]['post_status'] === true">Anonymous Member</div>
                            <div v-else>{{ comments_container[commentid]['user'] }}</div>
                            <div>{{ comments_container[commentid]['comment']}}</div>
                        </div>
                            <div class="comment_timestamp">{{ comments_container[commentid]['date']}}<span> | {{  comments_container[commentid]['time']  }}</span>
                            del option for user comment
                            <span v-if="comments_container[commentid]['user'] == username" class="del_comment" @click="delete_comment(commentid, postid)">
                                delete
                            </span></div>
                    </span>
                </div> -->
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
    <QuizButton />
</template>

<script setup>
import BackButton from '@/components/buttons/backButton.vue';
import Helplines from './Helplines.vue';
import TestingCenters from './TestingCenters.vue';
import QuizButton from '@/components/buttons/QuizButton.vue';
import { onMounted, onUnmounted, ref as vue_ref } from 'vue';
import { HIVYE_database } from '@/main';
import { ref as firebase_ref, off, onValue } from 'firebase/database';
import { useRoute } from 'vue-router';
import { formatDate, formatTimestamp } from '@/scripts/dateAndTime';
const helplineActive = vue_ref(true);
const testingActive = vue_ref(false);
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

const route = useRoute();
const post_id = route.params.id;
const post = vue_ref(null);

const fetchData = async () => {
    const post_ref = firebase_ref(HIVYE_database, 'posts/' + post_id)

    onValue(post_ref, (snapshot) => {
        post.value = snapshot.val();
        console.log('content:', post.value)
    }, (error) => {
        console.error('Read failed:', error);
    });

    return post_ref;
}

let post_reference

onMounted(async () => {
    console.log('id:', post_id)
    post_reference = await fetchData();
    console.log('ref: ', post_reference)
    // console.log('post: ', post.value)
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