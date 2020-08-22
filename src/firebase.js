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

const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
}