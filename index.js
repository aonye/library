// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyAV_YlzZhAz1poLEBst9WojNf9SD86Hbro",
    authDomain: "library-74954.firebaseapp.com",
    projectId: "library-74954",
    storageBucket: "library-74954.appspot.com",
    messagingSenderId: "85394537563",
    appId: "1:85394537563:web:422c6414a7a19765d0137e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No Firebase configuration object provided.' + '\n' +
            'Add your web app\'s configuration object to firebase-config.js');
    } else {
        return config;
    }
}