<template>
    <div class="flex flex-row">
        <section class="profile_section mb-[50px] select-none">
            <section class="flex flex-col justify-center text-white p-8 border-b border-1 border-gray-500">
                <div class="flex gap-8">
                    <div class="profile_pic w-[60px] bg-matcha h-[60px] rounded-full"></div>

                    <div class="profile flex flex-col">
                        <h1 class="text-2xl font-bold">{{ displayName }}</h1>
                        <span class="text-gray-300">@{{ username }}</span>
                        <div class="mx-auto my-4">
                            <span v-if="!bio">No bio yet</span>
                            <span v-if="bio">{{ bio }}</span>
                        </div>
                    </div>
                </div>
                <div class="text-darkBlue flex flex-row justify-center gap-4">
                    <div class="w-1/2 p-2 mt-6 cursor-pointer rounded-lg bg-white hover:bg-gray-300 text-center" @click="udpateProfileModalVisible=true">Update Profile</div>
                    <div class="w-1/2 p-2 mt-6 cursor-pointer rounded-lg bg-white hover:bg-gray-300 text-center" @click="logoutModalVisible=true">Logout</div>
                </div>
                
            </section>        
            <section class="w-full mb-[50px] text-gray-300 flex justify-center">
                <span v-if="no_posts()" class="m-8">no posts yet</span>
                <div v-if="post" class="flex flex-col h-auto w-full">
                    <div 
                        v-for="p in Object.keys(post).reverse()" 
                        :key="p" 
                        class="flex flex-col border-y border-1 w-full border-gray-700 text-white hover:bg-gray-950"
                        >
                        <router-link :to="`/post/${p}`"
                            class=" cursor-pointer">
                            <!-- header -->
                            <div class="flex flex-row w-full items-center px-4 pt-4">
                                <h1 class="font-bold text">{{ post[p].display_name }}</h1>
                                <span class="ml-auto">Posted {{ timeAgo(post[p]['time']) }}</span>
                            </div>
                            <!-- post content -->
                            <div class="flex w-full items-center text-left px-4 py-2 text-xl">
                                {{ post[p].post_content }}
                            </div>
                            <!-- img -->
                            <!-- image -->
                            <div v-show="`${post[p]['url']}` != 'empty'">
                                <img class="w-10/12 sm:w-8/12 mx-auto sm:ml-6 rounded-lg h-auto my-5" :src="`${post[p]['url']}`" alt="Image" />
                            </div>
                        </router-link>
                        <!-- interactions and metrics -->
                        <div class="flex flex-row w-full gap-3 px-4 items-center mt-2 mb-4">
                            <!-- for like button kaso di ko pa naayos -->
                            <div class="flex items-center cursor-pointer gap-1 hover:text-matcha" id="likeBtn" >
                                <unlike v-show="!user_liked[p]" />
                                <like v-show="user_liked[p]"/>
                                <!-- calculate the length of likes obj -->
                                <span>{{likeCount[p]}} likes</span>
                            </div>
                            <!-- comment icon den -->
                            <div class="flex items-center cursor-pointer gap-1 hover:text-matcha" id="commentBtn" >
                                <commentButton />
                                <!--<i class="fas fa-comment fa-xl"></i>-->
                                <span>Comment</span>
                            </div>
                        </div>
                        <!-- comment section -->
                        
                    </div>
                </div>
            </section>
        </section>
        <section class="side_content fixed border-l border-1 border-gray-700 right-0 h-screen text-white transition-linear duration-1000">
            <Helpline_mobile />
        </section>        
    </div>



    <modal v-if="udpateProfileModalVisible"  @close="udpateProfileModalVisible = false">
        <span class="p-6 text-lg">Update Profile</span>

        <label for="displayName" class="mx-6 text-sm font-bold mb-1">Name</label>
        <input 
            type="text" 
            name="displayName" 
            class="text-sm rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-6 mb-4"
            v-model="displayName"
            />
        
        <label for="username" class="mx-6 text-sm font-bold mb-1">Username</label>
        <input 
            type="text" 
            name="username"
            class="text-sm rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-6 mb-4"
            v-model="username"/>
    
            
        <!-- <label for="email" class="mx-4 text-sm font-bold">Email</label>
        <input 
            type="email" 
            name="email"
            class="text-lg rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-4 mb-4"
            v-model="email"/> -->

        <label for="bday" class="mx-6 text-sm font-bold mb-1">Birthday</label>
        <input 
            type="date" 
            name="bday"
            class="w-auto text-sm rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-6 mb-4"
            v-model="birthday"/>
        
        <label for="BIO" class="mx-6 text-sm font-bold mb-1">Bio</label>
        <input 
            type="text" 
            name="bio" 
            class="text-sm rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-6 mb-4"
            placeholder="Add a bio"
            v-model="bio"/>
        
        <div class="flex mt-2 text-sm text-red-400 font-bold ">
            <button class="w-1/2 p-4 hover:bg-gray-900 rounded-bl-xl"
                @click="advSettings=true">Advanced
            </button>
            <button class="w-1/2 p-4 hover:bg-gray-900 rounded-br-xl"
                @click="updateProfileInfo">Update
            </button>
        </div>
    </modal>
    <modal v-if="advSettings" @close="advSettings = false">
        <span class="p-4 text-lg">Advanced Settings</span>
        <div class="p-4">Change email</div>
        <div class="p-4">Change password</div>
    </modal>
    <modal v-if="logoutModalVisible"  @close="logoutModalVisible = false">
        <span class="p-6 text-lg">Log out ka na?</span>
        <img src="\logo\exit.jpg" class="mx-9"/>
        <button class="mt-auto text-red-400 font-bold p-3 hover:bg-gray-900 rounded-b-lg"
            @click="logout">bye
        </button>
    </modal>
</template>

<script setup>

import Helpline_mobile from './Helpline_mobile.vue';
import like from '@/components/icons/like.vue';
import unlike from '@/components/icons/unlike.vue';
import commentButton from '@/components/buttons/commentButton.vue';
import modal from '@/components/modals/modal.vue';

import { onMounted, ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useUserStore } from '@/stores/user';
import { fetchUserPostsId } from '@/scripts/user';
import { ref as firebase_ref, onValue } from 'firebase/database';
import { HIVYE_database } from '@/main';
import { timeAgo } from '@/scripts/dateAndTime';



const displayName = ref("");
const UID = ref(null);
const username = ref("");
const birthday = ref(null);
const email = ref(null);
const bio = ref(null);
const user_liked = ref({});
const likeCount = ref({});

const userpost = ref(null);
const post = ref({});
const logoutModalVisible = ref(false);
const udpateProfileModalVisible = ref(false);
const advSettings = ref(false);

const useStore = useUserStore();

const no_posts = () => {
    const post_size = Object.keys(post.value).length
    if(post_size==0){
        return true
    }
    return false
}
const fetchData = async (post_id) => {
    const post_ref = firebase_ref(HIVYE_database, 'posts/' + post_id)

    onValue(post_ref, (snapshot) => {
        post.value[post_id] = snapshot.val();
    }, (error) => {
        console.error('Read failed:', error);
    });

    return post_ref;
}

onMounted(async () => {
    const useStore = useUserStore();
    
    displayName.value = useStore.displayName;
    UID.value = useStore.user_id;
    email.value = useStore.user_email;
    username.value = useStore.username;
    birthday.value = useStore.birthday;

    userpost.value = await fetchUserPostsId(UID.value);
    
    for(const i of userpost.value){
        fetchData(i);
    }
    // console.lag(useStore.user_email, useStore.username, useStore.displayName, useStore.birthday)
})

const logout = async () => {
    const auth = getAuth();
    try{
        await signOut(auth);        
        useStore.eraseUserState();
    } catch (error) {
        console.error("Error signing out: ", error.code, error.message);
    }
}
const updateProfileInfo = async () => {
    console.log("profile updated");
}
</script>

<style scoped>
.profile_section{
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
    .profile_section{
        width: 100%;
    }
}

</style>