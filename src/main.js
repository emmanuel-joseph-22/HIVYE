import './styles/output.css';
import './styles/index.css';
import '@mdi/font/css/materialdesignicons.min.css'; // Import MDI

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import App from './App.vue';
import router from './router';
import { useUserStore } from './stores/user';
import { fetchUserData } from './scripts/user';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const firebase_app = initializeApp(firebaseConfig);
export const HIVYE_database = getDatabase(firebase_app);
// export const HIVYE_storage = getStorage(firebase_app);

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
      const [name, u_name, bday] = await fetchUserData(user.uid)
      // if user cred is not in state
      userStore.eraseUserState()
      userStore.setUserCred(user.uid, user.email, name, u_name, bday, true);
      
      // console.lag('welcome: ', userStore.user_id, userStore.user_email, name, u_name, bday);
      router.push('/'); 
    } catch (error) {
      console.error('error authenticating current user: ', error);
    }
  } else {
    // User is not authenticated, redirect to the login page
    router.push('/login');
  }
});
