import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8TFiuNSwJvLtvUc0mWucvR1h4mRLGEFI",
    authDomain: "reno-78074.firebaseapp.com",
    projectId: "reno-78074",
    storageBucket: "reno-78074.appspot.com",
    messagingSenderId: "574219515991",
    appId: "1:574219515991:web:933b2e603f86b34376cb12",
    measurementId: "G-2PEQK35EQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app); 