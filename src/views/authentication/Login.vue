<template>
    <div class="flex flex-row w-full mx-auto text-white">
        <!-- login component -->
        <div class="h-screen p-0 sm:p-12 w-full md:w-1/2 lg:w-1/3 xl:1/4  mx-auto">
            <div class="auth_card container h-full text-center flex flex-col items-center justify-center py-8 px-5 mx-auto shadow-none sm:shadow-lg ">
                <img src="./../../assets/HIVYE_logo.png" class="w-1/3 mx-auto"/>
                <!-- <h1 class="my-12">Login</h1> -->

                <div class=" flex flex-col px-6 my-8 w-full">
                    <label for="user_email" class="font-bold mb-2 text-left">Email</label>
                    <input 
                        autofocus id="input_userid" 
                        type="email"
                        name="user_email" 
                        required placeholder="yourname@mail.com" 
                        :class="{ 'border-red-600 border-2': errorEmailMsg && !emailIsValid() }" 
                        class="px-4 py-2 mb-4 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-darkBlue" 
                        v-model="email"/>
                        <span class="text-red-400 text-left text-sm mb-4">{{ errorEmailMsg }}</span>
                    <label for="password" class="font-bold mb-2 text-left">Password</label>
                    <input 
                        :type="passwordVisibility ? 'text' : 'password'" 
                        id="input_password" 
                        name="password" 
                        required placeholder="Password" 
                        :class="{ 'border-red-600 border-2': errorPWMsg && !passwordIsValid() }" 
                        class="pl-4 pr-10 py-2 mb-4 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-black" 
                        v-model="password"/>
                        <span class="text-red-400 text-left text-sm mb-4">{{ errorPWMsg }}</span>
                    <!-- <button @click="togglePasswordVisibility" class="absolute top-6 transform -translate-y-1/2 right-2 focus:outline-none">
                                <img v-if="!passwordVisibility" src="hide.png" alt="Hide password" class="h-6 w-6">
                                <img v-else src="view.png" alt="Show password" class="h-6 w-6">
                            </button> 
                            <div v-if="errorMsg" class="flex items-center bg-red-200 border-2 border-red-600 p-2 rounded-xl">
                                <img src="exclamation.png" alt="Error icon" class="w-6 h-6 mr-2">
                                <p class="font-bold text-red-600 text-sm">{{ errorMsg }}</p>
                            </div>-->
                    <!-- login button -->
                    <div @click="login" class="auth_button flex justify-center items-center my-12">
                        <a href="#" class="relative block bg-bsu-base border-2 border-solid border-matcha text-matcha hover:text-white bg-opacity-50 px-6 py-3 rounded-full overflow-hidden tracking-widest">
                            <span class="relative transition duration-1000">LOG IN</span>
                            <div class="wave absolute left-0 w-full h-full bg-matcha transition duration-1000"></div>
                        </a>
                    </div>

                    <span class="text-sm">
                        Don't have an account? 
                        <router-link to="/signup" class="text-green-600 hover:text-matcha">Sign Up</router-link> 
                    </span>
                </div>
                
            </div>
        </div>
    </div>
</template>
<style scoped>
.auth_button a span{
    z-index: 1;
}
.auth_button a .wave{
    position: absolute;
    top: calc(100% + 22px);
    transition: 1s;
}
.auth_button a:hover .wave{
    top: 0;
}
.auth_button a .wave::before{
    content: '';
    position: absolute;
    top: -22px;
    left: 0;
    width: 100%;
    height: 22px;
    background-image: 'wave.png';
    animation: animate 0.5s linear infinite;
}
@keyframes animate{
        0%
    {
        background-position-x: 0;
        background-position-x: -22px;
    }
    100%
    {
        background-position-x: 118px;
    }
}
</style>
<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const email = ref("");
const password = ref("");
const errorEmailMsg = ref("");
const errorPWMsg = ref("");
//const errorPWMsg = ref("");
const passwordVisibility = ref(false);

const router = useRouter();
const userStore = useUserStore();

const emailIsValid = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email.value);
};

const passwordIsValid = () => {
    return password.value.length >= 8; 
};

const login = async () => {
    errorEmailMsg.value = "";
    errorPWMsg.value = "";

    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log("Successfully logged in!");
        const user = userCredential.user; // Retrieve the user object
        const userId = user.uid; // Retrieve the user ID (UID)
        const user_email = user.email;
        const displayName = user.displayName;

        // state management here
        userStore.setUserCred(userId, user_email, displayName);

        router.push('/forum');
        
    } catch (error) {
        console.error('Error logging in: ', error.code, error.message);
        switch (error.code) {
            case "auth/invalid-email":
                errorEmailMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errorEmailMsg.value = "Email not found";
                break;
            case "auth/wrong-password":
                errorPWMsg.value = "Invalid Password";
                break;
            default:
                errorPWMsg.value = "Email or password was incorrect";
                break;
        }
    }
}
</script>