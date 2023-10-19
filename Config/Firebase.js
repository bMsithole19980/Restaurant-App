// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA--GaHDXOmBuPyynRisPbEbtlrB_iuZ6I",
  authDomain: "restaurant-cc453.firebaseapp.com",
  projectId: "restaurant-cc453",
  storageBucket: "restaurant-cc453.appspot.com",
  messagingSenderId: "963083910679",
  appId: "1:963083910679:web:15ec39cc115c6eb4d0e652",
  measurementId: "G-F64X3C3V7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app)
export {auth, db};