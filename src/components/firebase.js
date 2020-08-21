import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDaOiue9HwmhgclJhcj_78qiW21Ha-tYks",
    authDomain: "jupiter-extension-robert.firebaseapp.com",
    databaseURL: "https://jupiter-extension-robert.firebaseio.com",
    projectId: "jupiter-extension-robert",
    storageBucket: "jupiter-extension-robert.appspot.com",
    messagingSenderId: "1029205298260",
    appId: "1:1029205298260:web:150ad1aba345b94e9af1c1",
    measurementId: "G-8ZGWC18KBX"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();