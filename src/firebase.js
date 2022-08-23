import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUOx6IIiOWmdDIt8oKu9NppV5aXrpSY5A",
    authDomain: "plivo-b5b15.firebaseapp.com",
    projectId: "plivo-b5b15",
    storageBucket: "plivo-b5b15.appspot.com",
    messagingSenderId: "908022619995",
    appId: "1:908022619995:web:ebbc756fbe74d18a2b847e"
  };

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
const app = initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default firebaseConfig;