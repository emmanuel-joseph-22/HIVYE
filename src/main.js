import './styles/output.css';
import './styles/index.css';
import '@mdi/font/css/materialdesignicons.min.css'; // Import MDI

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
  apiKey: "AIzaSyDbSK9-Q9Q3v23r1Go3vDoM9bVvODcEpx4",
  authDomain: "hivye-23.firebaseapp.com",
  databaseURL: "https://hivye-23-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hivye-23",
  storageBucket: "hivye-23.appspot.com",
  messagingSenderId: "666783161186",
  appId: "1:666783161186:web:cbfb2c22082438234daa3b"
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
      // if user cred is not in state
      if(!userStore.user_id){
           userStore.setUserCred(user.uid, user.email, user.displayName);
      }
      
      console.log('welcome: ', userStore.user_id, userStore.user_email);
      
      router.push('/'); 
    } catch (error) {
      console.error('error authenticating current user: ', error);
    }
  } else {
    // User is not authenticated, redirect to the login page
    router.push('/login');
  }
});