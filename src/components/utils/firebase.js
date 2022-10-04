import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwFGH-xMwdtEX4HaX8kSWMZCZdPZOFJIo",
  authDomain: "wheres-waldo-4ce5e.firebaseapp.com",
  projectId: "wheres-waldo-4ce5e",
  storageBucket: "wheres-waldo-4ce5e.appspot.com",
  messagingSenderId: "892984309195",
  appId: "1:892984309195:web:3006dc83e21f5e8105724e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
