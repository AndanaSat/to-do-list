// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCwJzpI9mE0BZNWGSmLlBn2Zitk0itwHg",
  authDomain: "todolist-6d472.firebaseapp.com",
  projectId: "todolist-6d472",
  storageBucket: "todolist-6d472.appspot.com",
  messagingSenderId: "868258812620",
  appId: "1:868258812620:web:cbe3b409eb49a3d52e6869"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firestorm
const projectFirestore = firebase.firestore();
export { projectFirestore }