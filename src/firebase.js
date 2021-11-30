import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrpvweTRudFF_x6T2vEw4_m_tCPNJsbFM",
  authDomain: "mymagazine-374c0.firebaseapp.com",
  projectId: "mymagazine-374c0",
  storageBucket: "mymagazine-374c0.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBSE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBSE_APP_ID,
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

export const apiKey = firebaseConfig.apiKey;
export const auth = firebase.auth();
export const db = firebase.firestore();
