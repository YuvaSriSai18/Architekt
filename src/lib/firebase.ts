import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC76Pmn9rvw2GOTcRWk2u9J22EuD4gTjk4",
  authDomain: "cloud0924.firebaseapp.com",
  databaseURL: "https://cloud0924-default-rtdb.firebaseio.com",
  projectId: "cloud0924",
  storageBucket: "cloud0924.appspot.com",
  messagingSenderId: "587763029124",
  appId: "1:587763029124:web:02e0c870663aca7b6f9ed1",
  measurementId: "G-X0PBZFJPLM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
