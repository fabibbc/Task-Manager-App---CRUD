// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdEgXNsjYndieTXHF5qGR6hKVDQWSNsUY",
  authDomain: "task-manager-app-2b440.firebaseapp.com",
  projectId: "task-manager-app-2b440",
  storageBucket: "task-manager-app-2b440.appspot.com",
  messagingSenderId: "500558225949",
  appId: "500558225949"
};
  

const app = initializeApp(firebaseConfig);

console.log(app);

const db = getFirestore(app);

console.log(db);

export { db };



