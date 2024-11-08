// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdEgXNsjYndieTXHF5qGR6hKVDQWSNsUY",
  authDomain: "task-manager-app-2b440.firebaseapp.com",
  projectId: "task-manager-app-2b440",
  storageBucket: "task-manager-app-2b440.firebasestorage.app",
  messagingSenderId: "500558225949",
  appId: "1:500558225949:web:f1d968aef9455383a29cf4",
  measurementId: "G-ZQ2EMKJ09Q"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth, app };





