// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALddg0jSMvRNdJNLA8I2e-_aFMsrfbAww",
  authDomain: "carsminiracerses.firebaseapp.com",
  projectId: "carsminiracerses",
  storageBucket: "carsminiracerses.appspot.com",
  messagingSenderId: "831874569109",
  appId: "1:831874569109:web:43336d4474402a77d71c9c",
  measurementId: "G-S70DV838LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);