/* eslint-disable no-unused-vars*/
import * as firebase from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  collection,
  getDocs,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "pomodoro-2cb1e",
  storageBucket: "pomodoro-2cb1e.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signIn = async (email, password) => {
  // TODO: Client Side Validation

  return await signInWithEmailAndPassword(auth, email, password)
    .then((user) => ({ user: user.user, success: true }))
    .catch((err) => ({ message: err.message, code: err.code, success: false }));
};

const register = async (email, password, name, photoURL) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(() =>
      updateProfile(auth.currentUser(), { displayName: name, photoURL })
    )
    .then(() => ({ user: auth.currentUser(), success: true }))
    .catch((err) => ({
      message: err.message,
      code: err.code,
      success: false,
    }));
};

const findUserProfile = async (username) => {};

export { signIn, register, findUserProfile };
