// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbBZAYppYtRcE-J5cpvyXVlS-fOl0zKng",
  authDomain: "smartmalluz.firebaseapp.com",
  databaseURL: "https://smartmalluz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smartmalluz",
  storageBucket: "smartmalluz.firebasestorage.app",
  messagingSenderId: "378050316951",
  appId: "1:378050316951:web:a5698bd0308bfd444af7d2",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore
const db = getFirestore(app);

export { db };