import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
//for authentication 
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
   


// for firestore
import {
    getFirestore,
    serverTimestamp,
    doc,
    collection,
    getDocs, where,
    query,
    addDoc,
    updateDoc,
   deleteDoc
    // onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
    
   
const firebaseConfig = {
    apiKey: "AIzaSyABKOzM6pBfF6DWLit-UHWJc_D4Adz7ruI",
    authDomain: "post-application-firebase.firebaseapp.com",
    projectId: "post-application-firebase",
    storageBucket: "post-application-firebase.firebasestorage.app",
    messagingSenderId: "176355530954",
    appId: "1:176355530954:web:438a47282a752f7496fc33",
    measurementId: "G-0FB2T0JP1L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export {
    auth,
    createUserWithEmailAndPassword,
    getAuth,
    serverTimestamp, addDoc
    , collection,
    db,
    GoogleAuthProvider,
    provider,
    signInWithPopup,
    signInWithEmailAndPassword,
    query, getDocs,
    where,
    doc,
    onAuthStateChanged,
    signOut,
    updateDoc,
    updateProfile,
    deleteDoc
    
}