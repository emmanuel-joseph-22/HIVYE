<template>
    <div 
        v-for="post in Object.keys(posts_container).reverse()"
        :key="post" 
        class="flex flex-col border-b border-1 w-full border-gray-700 text-white hover:bg-gray-950"
        >
        <router-link :to="{ name: 'postView' }" class=" cursor-pointer">
            <!-- header -->
            <div class="flex flex-row w-full items-center px-4 pt-4">
                <h1 class="font-bold text">{{ posts_container[post].user }}</h1>
                <span class="ml-auto">{{ posts_container[post].date }}</span>
            </div>
            <!-- post content -->
            <div class="flex w-full items-center text-left px-4 py-1">
                {{ posts_container[post].post_content }}
            </div>
        </router-link>
        <!-- interactions and metrics -->
        <div class="flex flex-row w-full gap-2 px-4 items-center my-2">
            <!-- like -->
            <likeButton />
            <!-- comments -->
            <CommentButton @click="toggle_comment(post)"/>
        </div>
        <!-- comment section -->
        <div v-if="showComments === post" class="w-11/12 mx-auto mt-1 mb-4 flex flex-row gap-2">
            <input type="textarea" class="w-full rounded-lg py-1 px-2 bg-darkBlue" placeholder="Enter comment...">
            <button class="px-2 ml-1 rounded-lg bg-matcha">Send</button>
        </div>
    </div>
</template>

<script>
import likeButton from './likes.vue';
import CommentCard from './commentCard.vue';
import CommentButton from '../buttons/commentButton.vue';

import { ref as firebase_ref, get, remove as firetrash } from 'firebase/database';
import { HIVYE_database as db } from "@/main";
import { useUserStore } from '@/stores/user';
export default{
    components: {
        CommentButton,
        likeButton,
        CommentCard
    },
    setup(){
        const store = useUserStore();
        const { user_id, username } = store;

        return{ user_id, username, store }
    },
    mounted(){
        const post_ref = firebase_ref(db, 'posts');
        const user_liked_posts = firebase_ref(db, 'users/' + this.user_id + '/interactions/likes')
        get(post_ref)
        .then((snapshot) => {
            if (snapshot.exists()) {
                this.posts_container = snapshot.val();
                snapshot.forEach((childSnapshot) => {
                    const post_id = childSnapshot.key
                    const likeCount = childSnapshot.val().likes
                    const num_likes = Object.keys(likeCount).length
                    this.likeCount[post_id] = num_likes - 1
                })
            } else {
                console.log("No data available");
            }
        })
        .then(() => {
            get(user_liked_posts)
            .then((data) => {
                if(data.exists()){
                    const likes_interaction = data.val()
                    const post_index_cont = (Object.keys(likes_interaction))
                    // store the likes interactions into an array to intialized the like state of every liked posts
                    post_index_cont.forEach(key => {
                        this.user_liked[key] = true
                    })
                }
            }).catch((error) => {
                console.log("Error loading liked posts ", error )
            })
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
        // simulate a delay to not lose fetched data when rendered
    },
    data(){
        return {
            username: this.username,
            current_uid: this.user_id,

            post: '',
            imageUrl: '',
            date: '',
            time: '',
            like: '',
            comment: '',
            comment_content: '',
            
            // temp storage
            posts_container: {},
            comments_container: {},
            likeCount: {},
            user_liked: {},
            // for displaying/hiding contents on page
            showComments: null,
            commentLoaded: false,
            img_post_buttons: false,
            commentHasValue: false,
            // initialized a key for posting new posts
            anonymous: {
                newpost: true
            },
            characterLimit: 50, //for text truncation..di nagawa

        }
    },
    methods: {
        toggle_comment(index){
            this.showComments = this.showComments === index ? null : index;
        }
    }
}
</script>