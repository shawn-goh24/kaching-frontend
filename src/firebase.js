import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "kaching-b26cf.firebaseapp.com",
  projectId: "kaching-b26cf",
  storageBucket: "kaching-b26cf.appspot.com",
  messagingSenderId: "499886584618",
  appId: "1:499886584618:web:8c274c5bf4c652130a6453",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the database service and export the reference for other modules
export const storage = getStorage();
