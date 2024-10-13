// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUb8KgINwCMUo296DVf2ZU0wvRGIey1KE",
  authDomain: "stockanalyzer-fdab9.firebaseapp.com",
  projectId: "stockanalyzer-fdab9",
  storageBucket: "stockanalyzer-fdab9.appspot.com",
  messagingSenderId: "745339503177",
  appId: "1:745339503177:web:e77de6d3b0cbbd6c69f598"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
