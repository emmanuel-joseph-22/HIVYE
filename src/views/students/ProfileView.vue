<template>
    <section class="max-w-[800px] flex flex-col justify-center text-white p-8 border-b border-1 border-gray-500">
        <div class="flex gap-8">
            <div class="profile_pic min-w-[60px] bg-matcha min-h-[60px] rounded-full"></div>

            <div class="profile">
                <h1 class="text-2xl font-bold">{{ displayName }}</h1>
                <span class="text-gray-300">@{{ username }}</span>
            </div>
        </div>
        <div class="text-darkBlue flex flex-row justify-center gap-4">
            <div class="w-1/2 p-2 mt-6 cursor-pointer rounded-lg bg-white hover:bg-gray-300 text-center" @click="udpateProfileModalVisible=true">Update Profile</div>
            <div class="w-1/2 p-2 mt-6 cursor-pointer rounded-lg bg-white hover:bg-gray-300 text-center" @click="logoutModalVisible=true">Logout</div>
        </div>
        
    </section>

    <section class="max-w-[800px] text-gray-300 p-8 flex justify-center">
        no posts yet
    </section>
    <modal v-if="udpateProfileModalVisible"  @close="udpateProfileModalVisible = false">
        <span class="p-4 text-lg">Update Profile</span>

        <label for="displayName" class="mx-4 text-sm font-bold mb-1">Name</label>
        <input 
            type="text" 
            name="displayName" 
            class="text-lg rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-4 mb-4"
            v-model="displayName"
            />
        
        <label for="username" class="mx-4 text-sm font-bold mb-1">Username</label>
        <input 
            type="text" 
            name="username"
            class="text-lg rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-4 mb-4"
            v-model="username"/>
    
            
        <!-- <label for="email" class="mx-4 text-sm font-bold">Email</label>
        <input 
            type="email" 
            name="email"
            class="text-lg rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-4 mb-4"
            v-model="email"/> -->

        <label for="bday" class="mx-4 text-sm font-bold mb-1">Birthday</label>
        <input 
            type="date" 
            name="bday"
            class="w-auto text-lg rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-4 mb-4"
            v-model="birthday"/>
        
        <label for="BIO" class="mx-4 text-sm font-bold mb-1">Bio</label>
        <input 
            type="text" 
            name="bio" 
            class="text-lg rounded-lg bg-darkBlue border border-1 border-matcha focus:outline-matcha p-3 mx-4 mb-4"
            v-model="bio"/>
        
        <div class="flex mt-2 text-lg text-red-400 font-bold ">
            <button class="w-1/2 p-2 hover:bg-gray-900 rounded-bl-xl"
                @click="advSettings=true">Advanced
            </button>
            <button class="w-1/2 p-2 hover:bg-gray-900 rounded-br-xl"
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
        <span class="p-6 text-lg">Bye bitch.</span>
        <button class="mt-auto text-red-400 font-bold p-3 hover:bg-gray-900 rounded-b-lg"
            @click="logout">💅
    </button>
    </modal>
</template>

<script setup>
import modal from '@/components/modals/modal.vue';
import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useUserStore } from '@/stores/user';
const displayName = ref("Emmanuel Joseph");
const UID = ref(null);
const username = ref("sushislurp");
const email = ref(null);
const useStore = useUserStore();

const logoutModalVisible = ref(false);
const udpateProfileModalVisible = ref(false);
const advSettings = ref(false);
if(useStore.displayName){
    displayName.value = useStore.displayName;
}
UID.value = useStore.user_id;
email.value = useStore.user_email;
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