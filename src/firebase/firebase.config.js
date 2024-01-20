// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQOOGIkREY4A-aO24fMxkK2lJoc2hdGQc",
  authDomain: "unity-spark-22122.firebaseapp.com",
  projectId: "unity-spark-22122",
  storageBucket: "unity-spark-22122.appspot.com",
  messagingSenderId: "176845086971",
  appId: "1:176845086971:web:11bc7ad8fed1851865d05e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
