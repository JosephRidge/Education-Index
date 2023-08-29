import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZdo8DS1vr0EBhyBkZhPnmuKuA8x4iQGc",
  authDomain: "employment-index.firebaseapp.com",
  projectId: "employment-index",
  storageBucket: "employment-index.appspot.com",
  messagingSenderId: "572147993074",
  appId: "1:572147993074:web:7d35972da4dc421a65c36b",
  measurementId: "G-EN4B6S4QT4"
};

// Initialize Firebase
 initializeApp(firebaseConfig); 
createApp(App).mount('#app')
