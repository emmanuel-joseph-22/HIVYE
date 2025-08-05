<template>
    <div class="flex flex-row">
        <section class="forum_section mb-[50px]">
            <div class="select-none text-white w-full py-2 px-4 text-lg text-center border-b border-gray-700 border-1">
                <span class="hidden sm:block">For You</span>
                <span class="sm:hidden block font-bold">HIVYE</span>
            </div>
            <!-- forum space -->
            <div id="flex flex-col h-auto" >
                <!-- post prompt -->
                <div class="flex flex-col h-auto w-11/12 my-8 mx-auto"> 
                    <textarea class="min-h-[20px] resize-none overflow-y-hidden py-2 px-4 my-2 text-white bg-transparent text-left border-none text-xl focus:border-none focus:outline-none" ref="post_textarea" rows="1" placeholder="Start a discussion here..." v-model="post" @input="adjustTextarea"></textarea>
                    <!-- will be visible if user entered something on the text area -->
                    <div v-if="post_buttons" class="flex flex-row w-auto ml-auto gap-2 items-center">
                        <!-- add a photo option -->
                        <div class="py-1 px-4">
                            <label for="fileInput" class="cursor-pointer" title="add a photo">
                                <PhotoButton class="w-[40px] h-[40px] text-white hover:text-matcha" />
                            </label>
                            <input type="file" id="fileInput" ref="uploaded_image" class="hidden" accept="image/*">
                        </div>
                        <!-- anon button 
                        <button class="flex rounded-full shadow-lg py-1 px-2 text-black bg-accentRed border border-2 border-red-700"
                            :class="{ 'bg-matcha text-black border border-2 border-green-700': anonymous }"
                            @click="anonymous==true">
                            Anonymous
                        </button>-->
                        <button class="py-1 px-4 rounded-full shadow-lg bg-white flex text-darkblue hover:bg-matcha"
                            @click="submit_post"
                            type="submit">
                            Post
                        </button>
                    </div>

                    <div v-if="imageUrl">
                        <h3>Uploaded Image:</h3>
                        <img :src="imageUrl" alt="Uploaded Image">
                    </div>
                </div>
                
                <!-- posts -->
                <div 
                    v-for="post in Object.keys(posts_container).reverse()" 
                    :key="post" 
                    class="select-none flex flex-col border-y border-1 w-full border-gray-700 text-white hover:bg-gray-950"
                    >
                    <router-link :to="`/post/${post}`"
                        class=" cursor-pointer">
                        <!-- header -->
                        <div class="flex flex-row w-full items-center px-4 pt-4">
                            <h1 class="font-bold text">{{ posts_container[post].display_name }}</h1>
                            <span class="ml-auto text-sm">Posted {{ timeAgo(posts_container[post]['time']) }}</span>
                        </div>
                        <!-- post content -->
                        <div class="flex w-full items-center text-left px-4 py-2 text-xl">
                            {{ posts_container[post].post_content }}
                        </div>
                        <!-- img -->
                         <!-- image -->
                        <div v-show="`${posts_container[post]['url']}` != 'empty'">
                            <img class="w-10/12 sm:w-8/12 mx-auto sm:ml-6 rounded-lg h-auto my-5" :src="`${posts_container[post]['url']}`" alt="Image" />
                        </div>
                    </router-link>
                    <!-- interactions and metrics -->
                    <div class="flex flex-row w-full gap-3 px-4 items-center mt-2 mb-4">
                        <!-- for like button kaso di ko pa naayos -->
                        <div v-if="!dataLoaded" class="flex items-center cursor-pointer gap-1 hover:text-matcha" id="likeBtn" @click="handleItemLike(post)">
                            <unlikedButton v-if="!user_liked[post]" />
                            <likedButton v-if="user_liked[post]"/>
                            <!-- calculate the length of likes obj -->
                            <span>{{likeCount[post]}} likes</span>
                        </div>
                        <!-- comment icon den -->
                        <div class="flex items-center cursor-pointer gap-1 hover:text-matcha" id="commentBtn" @click="display_comment(post)">
                            <CommentButton />
                            <!--<i class="fas fa-comment fa-xl"></i>-->
                            <span>Comment</span>
                        </div>
                    </div>
                    <!-- comment section -->
                    <div v-if="showComments === post" class="w-11/12 mx-auto mt-1 mb-4 flex flex-row gap-2">
                        <input type="textarea" class="w-full rounded-lg py-1 px-2 bg-darkBlue" placeholder="Enter comment..." v-model="comment_content" @input="send_comment_button">
                        <button @click="post_comment(post)" v-if="commentHasValue" class="px-2 ml-1 rounded-lg bg-matcha">Send</button>
                    </div>
                </div>
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
import PhotoButton from '@/components/icons/photo_icon.vue';
import likedButton from '@/components/icons/like.vue';
import unlikedButton from '@/components/icons/unlike.vue';
//import Postcard from '@/components/posts_components/postcard.vue';
import header from '../../components/navigations/header.vue'; 
import Helpline_mobile from './Helpline_mobile.vue';

// import CommentCard from '../../components/posts_components/commentCard.vue';
import CommentButton from '../../components/buttons/commentButton.vue';

import { HIVYE_database as db, HIVYE_storage as storage } from "@/main";
import { useUserStore } from '@/stores/user';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as firebase_ref, set as fireset, get, remove as firetrash } from 'firebase/database';
import { getCurrentTime, formatDate, timeAgo } from '@/scripts/dateAndTime';

export default{
    components: {
        header,
        //Postcard,
        Helpline_mobile,
        QuizButton,
        PhotoButton,
        CommentButton,
        likedButton,
        unlikedButton
    },
    setup(){
        return {
            formatDate, timeAgo 
        }
    },
    data(){
        return {
            post_buttons: false,
            imageUrl: '',
            user_id: null,
            username: null,
            display_name: null,
            post: '',
            date: '',
            time: '',
            like: '',
            comment: '',
            comment_content: '',
            
            // temp storage
            posts_container: {},
            comments_container: {},
            likeCount: {},

            
            // for displaying/hiding contents on page
            showComments: null,
            dataLoaded: true, // di ko niremove baka kelanganin
            commentLoaded: false,
            img_post_buttons: false,
            commentHasValue: false,

            // initialized a key for posting new posts
            anonymous: {
                newpost: true
            },

            characterLimit: 50, //for text truncation..di nagawa
            user_liked: {},
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
        //save post to database
        async submit_post(){
            try {
                const userStore = useUserStore();
                this.username = userStore.username
                this.user_id = userStore.user_id
                this.display_name = userStore.displayName
                
                //to generate randomized unique image id 
                let currentDate = new Date().toJSON().slice(0, 10);
                let currentTime = getCurrentTime();
                const today = new Date();
                const img_id = today.getFullYear() + "" +  + today.getMonth() + ""  + today.getDay() + "" + today.getHours() + "" + today.getMinutes() +  today.getSeconds() + "" + today.getMilliseconds()
                const storageRef = ref(storage, `folder/${img_id}`);
                const if_img_uploaded = this.$refs.uploaded_image.files[0]
                
                // url named "empty" if there is no uploaded picture
                var url = "empty";
                const timestamp = new Date().getTime()
                const postID = timestamp

                // uploads the picture in firebase storage
                if(if_img_uploaded){
                    await uploadBytes(storageRef, this.$refs.uploaded_image.files[0]);
                    url = await getDownloadURL(ref(storage, `folder/${img_id}`))
                }

                // pushing into database posts folder
                fireset(firebase_ref(db,"posts/" + postID),{
                    'post_content': this.post,
                    'user_id': this.user_id,
                    'username': this.username,
                    'display_name': this.display_name,
                    'date': currentDate,
                    'time': currentTime,
                    'url': url,
                    'likes': { user: 'null' },
                    'comments': { user: 'null' },
                    'post_status': this.anonymous
                })   
                .then(() => {
                    // record interaction 
                    fireset(firebase_ref(db, "users/"+this.user_id+"/interactions/user_posts/"+ postID), {
                        id:"null",
                    })
                })
                // for newly posted content, the post details is pushed to posts container objects to instantly show on feed
                this.posts_container[postID] = {
                    'post_content': this.post,
                    // 'user_id': this.user_id,
                    'username': this.username,
                    'display_name': this.display_name,
                    'date': currentDate,
                    'time': currentTime,
                    'url': url,
                    'likes': { user: 'null' },
                    'comments': { user: 'null' },
                    'post_status': this.anonymous
                }
                // initialize as empty likes
                this.likeCount[postID] = 0
                
                
                this.resetData()
                this.img_post_buttons = false;
                const textarea = this.$refs.post_textarea
                textarea.style.height = 'auto';
            } catch(error) {
                console.error("Error submitting post:", error);
            }
        },
        handleItemLike(index){
            const userStore = useUserStore();
            this.username = userStore.username // di ko pa nairergister ung usernames eto muna for now
            this.user_id = userStore.user_id

            let user_match
            const timestamp = new Date().getTime();
            const like_id = timestamp;
            const likes_ref = firebase_ref(db, 'posts/' + index + '/likes/' + like_id);
            const key_ref = firebase_ref(db, 'posts/' + index + '/likes');
            let like_key //reference for unliking

            get(key_ref)
                // search in likes if current user alr liked the post
                .then((snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const user_key = childSnapshot.child('user').val();
                        if(user_key == this.username){
                            user_match = user_key;
                            like_key = childSnapshot.key;
                        }
                    })
                })
                //this will unlike or like the post depending on the state based from user match variable
                .then(() => {
                    // unlike
                    if(user_match){
                        firetrash(firebase_ref(db, 'posts/' + index + '/likes/' + like_key))
                        .then(() => {
                            // remove interaction 
                            firetrash(firebase_ref(db, 'users/' + this.user_id + '/interactions/likes/' + index + '/' + like_key))
                            this.likeCount[index] = this.likeCount[index] - 1;
                            console.log(this.username + " unliked the post");
                            this.user_liked[index] = false
                        })
                    }
                    // like
                    if(!user_match){
                        fireset(likes_ref, {
                            user: this.username
                        }).then(() => {
                            // record interaction 
                            fireset(firebase_ref(db, "users/"+this.user_id+"/interactions/likes/"+index+"/"+ like_id), {
                                id:"null",
                            })
                            this.likeCount[index] = this.likeCount[index] + 1
                            console.log(this.username + " liked a post")
                            this.user_liked[index] = true
                        })
                    }
                }).catch((error) => {
                    console.error("Error liking posts:", error);
                });
        },
        display_comment(index){
            this.resetData()
            // selective display of comments based on the post
            this.showComments = this.showComments === index ? null : index;
            // render comment section
            setTimeout(() => {
                const comments_ref = firebase_ref(db, 'posts/' + index + '/comments');
                get(comments_ref)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        this.comments_container = snapshot.val();
                        // console.lag(this.comments_container)
                    } else {
                    console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
                this.commentLoaded = true;
            }, 500) // simulate a delay to render data */
        },
        resetData(){
            this.post = '',
            this.imageUrl = '',
            this.date = '',
            this.time = '',
            this.like = '',
            this.comment_content = '',
            this.anonymous = { newpost: true },
            this.commentHasValue = false
        },
        toggle_comment(index){
            this.showComments = this.showComments === index ? null : index;
        },
        post_comment(data){
            try{
                const userStore = useUserStore();
                this.user_id = userStore.user_id;
                this.username = userStore.username;
                let display_name = userStore.displayName;
                let currentDate = new Date().toJSON().slice(0, 10);
                let currentTime = getCurrentTime()
                const timestamp = new Date().getTime()

                const comment_id = timestamp
                const valueRef = firebase_ref(db, "posts/" + data + "/comments/" + comment_id)
                
                if(this.user_id){
                    fireset(valueRef, {
                        'comment': this.comment_content,
                        'userID': this.user_id,
                        'username': this.username,
                        'name': display_name,
                        'date': currentDate,
                        'post_status': this.anonymous,
                        'time': currentTime,
                    }).then(() => {
                        // record interaction 
                        fireset(firebase_ref(db, "users/"+ this.user_id +"/interactions/comments/" + data + "/"+ comment_id), {
                            id:"null",
                        })
                    })
                    this.resetData()
                } else {
                    // console.lag("user id: ", this.user_id)
                }
                
            }
            catch(error) {
                console.error('comment failed:', error);
            }
        },
        send_comment_button(){
            if(this.comment_content){
                this.commentHasValue = true
            }
            if(this.comment_content === ''){
                this.commentHasValue = false
            }
        },
    },
    mounted(){
        // so fetching the user details is repeated both mount hook and submit post
        // may ocd yarn
        const userStore = useUserStore();
        this.username = userStore.username
        this.user_id = userStore.user_id

        // fetch all posts from database and send it into post container obj
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
        .finally(() => {
                this.dataLoaded = false
            }).catch((error) => {
            console.error("Error fetching posts:", error);
        });
        // simulate a delay to not lose fetched data when rendered
       
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