<template>
        <div 
            v-for="post in fetched_posts" 
            class="flex flex-col border-b border-1 w-full border-gray-700 text-white hover:bg-gray-950"
            >
            <router-link :to="{ name: 'postView' }" class=" cursor-pointer">
                <!-- header -->
                <div class="flex flex-row w-full items-center px-4 pt-4">
                    <h1 class="font-bold text">{{ post.userName }}</h1>
                    <span class="ml-auto">{{ post.datePosted }}</span>
                </div>
                <!-- post content -->
                <div class="flex w-full items-center text-left px-4 py-1">
                    {{ post.postContent }}
                </div>
            </router-link>
            <!-- interactions and metrics -->
            <div class="flex flex-row w-full gap-2 px-4 items-center my-2">
                <!-- like -->
                <likeButton />
                <!-- comments -->
                <CommentButton @click="post.commentPrompt = !post.commentPrompt"/>
            </div>
            <!-- comment section -->
            <div v-if="post.commentPrompt" class="w-11/12 mx-auto mt-1 mb-4 flex flex-row gap-2">
                <input type="textarea" class="w-full rounded-lg py-1 px-2 bg-darkBlue" placeholder="Enter comment...">
                <button class="px-2 ml-1 rounded-lg bg-matcha">Send</button>
            </div>
        </div>

    
</template>

<script>
import likeButton from './likes.vue';
import CommentCard from './commentCard.vue';
import CommentButton from '../buttons/commentButton.vue';
export default{
    components: {
        CommentButton,
        likeButton,
        CommentCard
    },
    data(){
        return {
            // dummy data muna
            fetched_posts: [
                {
                    userName: 'sushi',
                    datePosted: '10-20-2023',
                    postContent: 'And, too, when candles burn out And the record is faded down I know youve got people to turn to And, too, when candles burn out And the record is faded down I know youve got people to turn to',
                    commentPrompt: false,
                    likeCounts: 0,
                },
                {
                    userName: 'bussydestroyer',
                    datePosted: '10-19-2023',
                    postContent: 'i need coffee',
                    commentPrompt: false,
                    likeCounts: 0,
                },
                {
                    userName: 'jace',
                    datePosted: '10-18-2023',
                    postContent: 'cute ni vermax',
                    commentPrompt: false,
                    likeCounts: 0,
                },
                {
                    userName: 'this_bitch_crazy',
                    datePosted: '10-17-2023',
                    postContent: 'I havent done a cartwheel since I was nine',
                    commentPrompt: false,
                    likeCounts: 0,
                }
            ],
        }
    },
    methods: {
    }
}
</script>