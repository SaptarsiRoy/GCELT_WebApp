// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ5HfihUTE7AwmmLVuC6_30BwWsuPBBOg",
  authDomain: "gcelt-webapp.firebaseapp.com",
  projectId: "gcelt-webapp",
  storageBucket: "gcelt-webapp.appspot.com",
  messagingSenderId: "195291575936",
  appId: "1:195291575936:web:8959d5d1a828f1ba22d865"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const google_Provider = new GoogleAuthProvider();
export { auth, db, google_Provider };