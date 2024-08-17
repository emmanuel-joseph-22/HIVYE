<template>
    <section class="max-w-[800px] flex flex-col justify-center text-white p-8 border-b border-1 border-gray-500">
        <div class="flex gap-8">
            <div class="profile_pic min-w-[60px] bg-red-500 min-h-[60px] rounded-full"></div>

            <div class="profile">
                <h1 class="text-2xl font-bold">{{ displayName }}</h1>
                <span class="text-gray-300">@{{ username }}</span>
            </div>
        </div>
        <div class="text-darkBlue flex flex-row justify-center gap-4">
            <div class="w-1/2 p-2 mt-6 cursor-pointer rounded-lg bg-white hover:bg-gray-300 text-center">Update Profile</div>
            <div class="w-1/2 p-2 mt-6 cursor-pointer rounded-lg bg-white hover:bg-gray-300 text-center" @click="logout">Logout</div>
        </div>
        
    </section>

    <section class="max-w-[800px] text-gray-300 p-8 flex justify-center">
        no posts yet
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useUserStore } from '@/stores/user';
const displayName = ref("Emmanuel Joseph");
const username = ref("rand-310357923598612");
const useStore = useUserStore();

const logout = async () => {
    const auth = getAuth();
    try{
        await signOut(auth);        
        useStore.eraseUserState();
    } catch (error) {
        console.error("Error signing out: ", error.code, error.message);
    }
}
</script>