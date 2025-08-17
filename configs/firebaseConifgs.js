// Import the functions you need from the SDKs you need
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "videogen-4cd6f.firebaseapp.com",
    projectId: "videogen-4cd6f",
    storageBucket: "videogen-4cd6f.firebasestorage.app",
    messagingSenderId: "724008896370",
    appId: "1:724008896370:web:1765c59a075452dd607feb",
    measurementId: "G-SYBPYBGLX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);