// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// import dotenv from "dotenv";

// dotenv.config();
// TODO: Add SDKs for Firebase products that yoku want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1O63bTbReWCzaKYuuyeygrAKLbuw_O7U",
  authDomain: "pi-3-14.firebaseapp.com",
  projectId: "pi-3-14",
  storageBucket: "pi-3-14.appspot.com",
  messagingSenderId: "960028668561",
  appId: "1:960028668561:web:65ab43cf25b4b933838530"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const storage = getStorage(app);
