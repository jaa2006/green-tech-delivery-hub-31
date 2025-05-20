
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzxElHhcKa7qyGG6owxU_y3qA-GHW4xos",
  authDomain: "habisin-441d7.firebaseapp.com",
  projectId: "habisin-441d7",
  storageBucket: "habisin-441d7.firebasestorage.app",
  messagingSenderId: "918883873451",
  appId: "1:918883873451:web:74264331e796c270cf3dee",
  measurementId: "G-HZVBDG71QF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
