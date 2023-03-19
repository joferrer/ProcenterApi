// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOECbow8me5UhXPuzTJ0-h_qeKM8BBY1w",
  authDomain: "procenterapi.firebaseapp.com",
  projectId: "procenterapi",
  storageBucket: "procenterapi.appspot.com",
  messagingSenderId: "528212872046",
  appId: "1:528212872046:web:1bce4c692043b7e9c58f7f",
  measurementId: "G-XW5W38Q5EJ"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FiseBaseDB = getFirestore(FireBaseApp);
