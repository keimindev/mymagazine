import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

export const apiKey = firebaseConfig.apiKey;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
