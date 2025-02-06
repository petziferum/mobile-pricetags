import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPt03Bp5UBVXn72EVSWNAhvt4u0NI2m5M",
    authDomain: "recipes-petzi.firebaseapp.com",
    databaseURL: "https://recipes-petzi-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "recipes-petzi",
    storageBucket: "recipes-petzi.appspot.com",
    messagingSenderId: "214936827568",
    appId: "1:214936827568:web:345c47274d065fe45c6d75",
    measurementId: "G-15T3BLM6BP"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const analytics = getAnalytics(FIREBASE_APP);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);