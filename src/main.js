
import './styles/output.css';
import './styles/index.css';
import '@mdi/font/css/materialdesignicons.min.css'; // Import Material Design Icons

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

import App from './App.vue';
import router from './router';

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

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
