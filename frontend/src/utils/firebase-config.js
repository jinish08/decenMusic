// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEdwFAbWwblpj3f0ID97oKUdsQZY1y5Q8",
  authDomain: "decenmusic-47e4c.firebaseapp.com",
  projectId: "decenmusic-47e4c",
  storageBucket: "decenmusic-47e4c.appspot.com",
  messagingSenderId: "894372899009",
  appId: "1:894372899009:web:bc7e16fadf894d9bdd4c40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);