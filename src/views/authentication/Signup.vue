<template>
    <div class="flex flex-row w-full mx-auto text-white">
        <!-- signup component -->
        <div class="h-screen p-0 sm:p-12 w-full md:w-1/2 lg:w-1/3 xl:1/4  mx-auto">
            <div class="auth_card container h-full text-center flex flex-col items-center justify-center py-8 px-5 mx-auto shadow-none sm:shadow-lg ">
                <img src="/logo/HIVYE_logo.png" class="w-1/3 mx-auto"/>
                <!-- <h1 class="my-12">Register</h1> -->

                <Forms class=" w-full">
                    <section v-if="next_page==false" class="flex flex-col px-6 my-8 w-full">
                        <label for="user_email" class="font-bold text-left">Email</label>
                        <input 
                            autofocus id="input_userid" 
                            type="email"
                            name="user_email" 
                            required placeholder="yourname@mail.com" 
                            :class="{ 'border-red-600 border-2': errorEmailMsg && !emailIsValid() }" 
                            class="px-4 py-2 my-1 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-darkBlue" 
                            v-model="email"/>
                        <span class="text-left text-red-400 text-sm mb-4">{{ errorEmailMsg }}</span>
                        
                        <label for="password" class="font-bold text-left">Password</label>
                        <input 
                            :type="passwordVisibility ? 'text' : 'password'" 
                            id="input_password" 
                            name="password" 
                            required placeholder="Password" 
                            :class="{ 'border-red-600 border-2': errorPWMsg && !passwordIsValid() }" 
                            class="pl-4 pr-10 py-2 my-1 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-darkBlue" 
                            v-model="password"/>
                        <span class="text-left text-red-400 text-sm mb-4">{{ errorPWMsg }}</span>
                        
                        
                        <label for="username" class="font-bold text-left">Username</label>
                        <input 
                            type="text"
                            id="inpur_username" 
                            name="username" 
                            required placeholder="Username" 
                            class="pl-4 pr-10 py-2 my-1 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-darkBlue" 
                            v-model="username"
                        />
                        <!-- <span class="text-left text-red-400 text-sm mb-4">{{ errorPWMsg }}</span> -->
                        <label for="display_name" class="font-bold text-left">Display Name</label>
                        <input 
                            type="text"
                            id="inpur_display_name" 
                            name="display_name" 
                            required placeholder="Display Name" 
                            class="pl-4 pr-10 py-2 my-1 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-darkBlue" 
                            v-model="display_name"
                        />
                        <label for="birthday" class="font-bold text-left">Birthday</label>
                        <input 
                            type="date"
                            id="inpur_birthday" 
                            name="birthday" 
                            required
                            class="pl-4 pr-10 py-2 my-1 border border-matcha rounded-lg focus:outline-none focus:ring-2 focus:ring-matcha w-full text-darkBlue" 
                            v-model="birthday"
                        />

                        <div @click="signup" class="auth_button flex justify-center items-center my-12">
                            <a href="#" class="relative block bg-bsu-base border-2 border-solid border-matcha text-matcha hover:text-white bg-opacity-50 px-6 py-3 rounded-full overflow-hidden tracking-widest">
                                <span class="relative transition duration-1000">SIGN UP</span>
                                <div class="wave absolute left-0 w-full h-full bg-matcha transition duration-1000"></div>
                            </a>
                        </div>

                        <!-- <div @click="next_page == true" class="auth_button flex justify-center items-center my-12">
                            <a href="#page2" class="relative block bg-bsu-base border-2 border-solid border-matcha text-matcha hover:text-white bg-opacity-50 px-6 py-3 rounded-full overflow-hidden tracking-widest">
                                <span class="relative transition duration-1000">Next</span>
                                <div class="wave absolute left-0 w-full h-full bg-matcha transition duration-1000"></div>
                            </a>
                        </div> -->
                    </section>
<!--                     
                    <section id="page2" v-if="next_page==true" class="flex flex-col px-6 my-8 w-full">
                        <backButton @click="next_page==false"/>

                    </section> -->

                    <span class="text-sm">
                        Already have an account? 
                        <router-link to="/login" class="text-green-600 hover:text-matcha">Log In</router-link> 
                    </span>
                </Forms>
                
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { HIVYE_database as db } from '@/main';
import { set, ref as firebase_ref } from 'firebase/database';
import backButton from '@/components/buttons/backButton.vue';

const email = ref("");
const password = ref("");
const errorEmailMsg = ref("");
const errorPWMsg = ref("");
const next_page = ref(false);
const username = ref("");
const birthday = ref("");
const display_name = ref("")

const router = useRouter();
const userStore = useUserStore();

// Function to validate email format
const emailIsValid = () => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email.value);
};
// Function to validate password format
const passwordIsValid = () => {
  return (
      password.value.length >= 8 
        // && /[A-Z]/.test(password.value) &&
        // /\d/.test(password.value) &&
        // !/\s/.test(password.value)
  );
};

const signup = async () => {
  // Reset error message
  errorEmailMsg.value = "";
  errorPWMsg.value = "";
  if (!emailIsValid()) {
    errorEmailMsg.value = "Please enter a valid email.";
    return;
  }

  // Validate password second
  if (!passwordIsValid()) {
        errorPWMsg.value = "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and have no spaces.";
        return;
  }
  // check role 
  try {
      // Initialize Firebase Authentication
      const auth = getAuth();

      // Create a new user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(() => { 
            var user = auth.currentUser
            let currentDate = new Date().toJSON().slice(0, 10);
            // stores all user data into 'users' node in database
            // also intializes status as active
            set(firebase_ref(db,"users/" + user.uid),{
            'username': username.value,
            'password': password.value,
            'email': email.value,
            'birthday': birthday.value,
            'display_name': display_name.value,
            'date_created': currentDate,
            'status': "active"
            })
            .then(() => {
                userStore.setUserCred(user.uid, email.value, display_name.value, username.value, birthday.value, true);
            }).catch(error => console.error("Error in firebase/state:", error));
        })
        .then(() => {
            console.log("Successfully registered and data saved in db!");
            router.push("/forum");
        })
  } catch (error) {
      console.error("Error during signup:", error.code, error.message);
  }
};

</script>
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