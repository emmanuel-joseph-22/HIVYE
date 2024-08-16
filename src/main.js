import './styles/output.css';
import './styles/index.css';
import '@mdi/font/css/materialdesignicons.min.css'; // Import Material Design Icons

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import App from './App.vue';
import router from './router';
import { useUserStore } from './stores/user';

const firebaseConfig = {
  // your firebase config here
};

export const firebase_app = initializeApp(firebaseConfig);
export const HIVYE_database = getDatabase(firebase_app);
export const HIVYE_storage = getStorage(firebase_app);

export const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

// to auth 
const auth = getAuth(firebase_app);

const userStore = useUserStore();

onAuthStateChanged(auth, async user => {
  if (user) {
    try {
      // if user cred is not in state management
      if(!userStore.user_id){
           // state management here
           userStore.setUserCred(user.uid, user.email, user.displayName);
      }
      
      console.log('welcome: ', userStore.user_id, userStore.user_email);
      // Redirect to the previous route or the home page if no previous route exists
      router.push('/'); 
    } catch (error) {
      console.error('error authenticating current user: ', error);
      // Handle error
    }
  } else {
    // User is not authenticated, redirect to the login page or perform any other action
    router.push('/login');
  }
});
