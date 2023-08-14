// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD28Gup53uMkaA3tqU-DMmuLOavHlx6MRY",
  authDomain: "test-6b87f.firebaseapp.com",
  projectId: "test-6b87f",
  storageBucket: "test-6b87f.appspot.com",
  messagingSenderId: "568771633182",
  appId: "1:568771633182:web:814d21bf2aa147d4c30e0f",
  measurementId: "G-67LD7X8Q2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);