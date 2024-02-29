// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-6b30e.firebaseapp.com",
  projectId: "blog-6b30e",
  storageBucket: "blog-6b30e.appspot.com",
  messagingSenderId: "260111762133",
  appId: "1:260111762133:web:8e58ebb0f5ac499780185c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

