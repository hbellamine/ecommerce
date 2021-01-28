import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./config";
import { useRef } from "react";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);


//Logic behind authentification / create new user in firestore using google log in
export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //destructuring the uid from userAuth
  const { uid } = userAuth;
  const userRef = firestore.doc(`users/${uid}`);

  const snapshot = await userRef.get();
//if user doesn't exist then we create it
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (err) {
      console.log(err)
    }
  }

  //we return userRef to update our local components with user informations
  return userRef;
};
