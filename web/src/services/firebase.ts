// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCS7HH_T3raQwGhvO8FqD9M744FZSbWMRA",
    authDomain: "cadastro-usuarios-7ee2a.firebaseapp.com",
    projectId: "cadastro-usuarios-7ee2a",
    storageBucket: "cadastro-usuarios-7ee2a.appspot.com",
    messagingSenderId: "680428974588",
    appId: "1:680428974588:web:1b1dcc78fb7a7f90f20279"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);