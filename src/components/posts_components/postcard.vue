<template>
    <div 
        v-for="post in fetched_posts" 
        class="flex flex-col border-y border-1 w-full border-gray-700 text-white">
        <!-- header -->
        <div class="flex flex-row w-full items-center px-4 pt-4">
            <h1 class="font-bold text">{{ post.userName }}</h1>
            <span class="ml-auto">{{ post.datePosted }}</span>
        </div>
        <!-- post content -->
        <div class="flex w-full items-center text-left px-4 py-1">
            {{ post.postContent }}
        </div>
        <!-- interactions and metrics -->
        <div class="flex flex-row w-full gap-2 px-4 items-center mt-2 mb-4">
            <!-- like -->
            <likeButton />
            <!-- comments -->
            <CommentButton @click="toggleCommentSection"/>
        </div>
        <!-- comment section -->
        <div v-if="showComment">
            <CommentCard />
        </div>

    </div>
</template>

<script>
import likeButton from './likes.vue';
import CommentCard from './commentCard.vue';
import CommentButton from './commentButton.vue';
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

                },
                {
                    userName: 'bussydestroyer',
                    datePosted: '10-19-2023',
                    postContent: 'i need coffee',
                },
                {
                    userName: 'jace',
                    datePosted: '10-18-2023',
                    postContent: 'cute ni vermax',
                },
                {
                    userName: 'this_bitch_crazy',
                    datePosted: '10-17-2023',
                    postContent: 'I havent done a cartwheel since I was nine',
                }
            ],
            //comment section
            showComment: false,
        }
    },
    methods: {
        toggleCommentSection(){
            this.showComment = !this.showComment;
        }
    }
}
</script>