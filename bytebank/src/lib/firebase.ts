// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXwGhzGYNrnNJY7d2sjHdwIr8HFrVLU5I",
    authDomain: "autenticacao-fluxo.firebaseapp.com",
    projectId: "autenticacao-fluxo",
    storageBucket: "autenticacao-fluxo.firebasestorage.app",
    messagingSenderId: "930672490647",
    appId: "1:930672490647:web:1439b7cb87f42ce5b4d1d2",
    measurementId: "G-0TLYGH31PN"
};

// Initialize Firebase and Analytics(for future use)
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and creates a reference, in order to manage the authentication(Login, Logout, userState)
export const auth = getAuth(app);