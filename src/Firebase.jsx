// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAq5W3V07yZLrqxsv6oQL4Az_g8YOMo4j4",
  authDomain: "fluxv1-f88f0.firebaseapp.com",
  projectId: "fluxv1-f88f0",
  storageBucket: "fluxv1-f88f0.appspot.com",
  messagingSenderId: "208503344445",
  appId: "1:208503344445:web:2d343e6ae973dec9ed0954"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
//   appId: process.env.REACT_APP_APP_ID
// };

// REACT_APP_FIREBASE_AUTH_DOMAIN=fluxv1-f88f0.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=fluxv1-f88f0
// REACT_APP_FIREBASE_STORAGE_BUCKET=fluxv1-f88f0.appspot.com
// REACT_APP_MESSAGING_SENDER=208503344445
// REACT_APP_APP_ID=1:208503344445:web:2d343e6ae973dec9ed0954

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/*
commands run for firebase
- npm install firebase
- npm install -g firebase-tools
 */