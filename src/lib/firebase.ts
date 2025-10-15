import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwujbKb6GHQs_YEdn1PU29ub5BfILR5Sk",
  authDomain: "login-df87c.firebaseapp.com",
  projectId: "login-df87c",
  storageBucket: "login-df87c.firebasestorage.app",
  messagingSenderId: "353913785665",
  appId: "1:353913785665:web:923d9a7db5de3ba5d765c0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
