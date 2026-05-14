// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD7ULmCQo_usWWaJrnMETFDs347VvjV0C4",
  authDomain: "snapciti-web.vercel.app", // authDomain: "snapciti-com.firebaseapp.com",
  projectId: "snapciti-com",
  storageBucket: "snapciti-com.firebasestorage.app",
  messagingSenderId: "951918540433",
  appId: "1:951918540433:web:2dbb4e29b173ec6a89b130",
  measurementId: "G-ZSY7JMPPH8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const $auth = getAuth(app);
