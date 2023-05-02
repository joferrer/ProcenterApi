// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
const { getAnalytics } = require( "firebase/analytics")
const { getAuth } = require( "firebase/auth")
const { getFirestore } = require( "firebase/firestore/lite")
const {initializeApp} = require('firebase/app')




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
 const FireBaseApp = initializeApp(firebaseConfig);
 //const analytics = getAnalytics(FireBaseApp);
 const FireBaseAuth = getAuth(FireBaseApp);
 const FireBaseDB = getFirestore(FireBaseApp);

module.exports = {
  FireBaseApp,
  FireBaseAuth,
  FireBaseDB
}