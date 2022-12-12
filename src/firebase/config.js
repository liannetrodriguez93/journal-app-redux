// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGBrZNAIvhcP1ycAC6dYHXw-Mtkr475fM",
  authDomain: "react-couses.firebaseapp.com",
  projectId: "react-couses",
  storageBucket: "react-couses.appspot.com",
  messagingSenderId: "590597022728",
  appId: "1:590597022728:web:0e03f9730312c0dc901dbd"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore();