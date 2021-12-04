import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrpvweTRudFF_x6T2vEw4_m_tCPNJsbFM",
  authDomain: "mymagazine-374c0.firebaseapp.com",
  projectId: "mymagazine-374c0",
  storageBucket: "mymagazine-374c0.appspot.com",
  messagingSenderId: "827951285550",
  appId: "1:827951285550:web:2c26390484d2b01a16e6bf"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

export const apiKey = firebaseConfig.apiKey;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
