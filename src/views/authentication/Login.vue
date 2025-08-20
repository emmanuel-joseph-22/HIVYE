<template>
    <div class="flex flex-col md:flex-row w-full h-screen">
        <!-- left image -->
        <div class="hidden md:flex md:w-1/2 lg:w-2/3 xl:w-3/4 h-screen">
            <img src="/src/assets/login_bg.png" alt="Login background" class="w-auto h-auto object-cover" />
        </div>


        <div class="flex items-center justify-centermd:w-1/2 lg:w-1 xl:w-1/2 p-6 md:p-12">


            <div
                class="auth_card w-full text-white max-w-sm text-center items-center justify-center py-8 px-6 sm:px-10 rounded-xl">
                <!-- form -->
                <div class="flex flex-col my-8 w-full">
                    <!-- Email -->
                    <div class="text-white mb-6">
                        <h1 class="text-3xl  font-bold">Hello,</h1>
                        <h1 class="text-3xl font-bold mb-2">Welcome back!</h1>
                    </div>
                    <label for="user_email" class="font-bold mb-2 text-left">Email</label>
                    <input autofocus id="input_userid" type="email" name="user_email" required placeholder="Email"
                        :class="{ 'border-red-600 border-2': errorEmailMsg && !emailIsValid() }"
                        class="px-4 py-2 mb-4 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-darkBlue"
                        v-model="email" />
                    <span class="text-red-400 text-left text-sm mb-4">{{ errorEmailMsg }}</span>
                    <!-- Password -->
                    <label for="password" class="font-bold mb-2 text-left">Password</label>
                    <input :type="passwordVisibility ? 'text' : 'password'" id="input_password" name="password" required
                        placeholder="Password" :class="{ 'border-red-600 border-2': errorPWMsg && !passwordIsValid() }"
                        class="pl-4 pr-10 py-2 mb-4 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-black"
                        v-model="password" />
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
                        <a href="#"
                            class="relative block bg-bsu-base border-2 border-solid border-matcha text-white hover:bg-matcha bg-opacity-50 px-6 py-3 rounded-full overflow-hidden">
                            <span class="relative">Log In</span>
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
.auth_button a span {
    z-index: 1;
}

.auth_button a .wave {
    position: absolute;
    top: calc(100% + 22px);
    transition: 1s;
}

.auth_button a:hover .wave {
    top: 0;
}

@keyframes animate {
    0% {
        background-position-x: 0;
        background-position-x: -22px;
    }

    100% {
        background-position-x: 118px;
    }
}
</style>
<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { get, ref as firebase_ref } from 'firebase/database';
import { HIVYE_database } from '@/main';
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

        const [name, u_name, bday] = await fetchUserData(user.uid)
        // if user cred is not in state
        userStore.eraseUserState()
        userStore.setUserCred(user.uid, user.email, name, u_name, bday, true);

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