// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJmrkM5i-wZQ5mZrh0__Gmn6R76oqtSQE",
  authDomain: "zenith-2025.firebaseapp.com",
  projectId: "zenith-2025",
  storageBucket: "zenith-2025.firebasestorage.app",
  messagingSenderId: "35267378955",
  appId: "1:35267378955:web:0937ec1c422b2cb427ec0e",
  measurementId: "G-XNL6763T4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);


export { db,auth};
