// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "lost-and-found-d134d.firebaseapp.com",
    projectId: "lost-and-found-d134d",
    storageBucket: "lost-and-found-d134d.appspot.com",
    messagingSenderId: "256593001192",
    appId: "1:256593001192:web:ebb6f40a8060635cd3a75d",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
