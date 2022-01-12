/* eslint-disable no-unused-vars*/
import * as firebase from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  collection,
  doc,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import moment from "moment";

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
    .then((user) => {
      return { user: user.user, success: true };
    })
    .catch((err) => ({ message: err.message, code: err.code, success: false }));
};

const register = async ({ email, password, name, username, photoUrl }) => {
  let registerUser = await createUserWithEmailAndPassword(auth, email, password)
    .then(() =>
      updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: photoUrl,
      })
    )
    .then(() => ({ user: auth.currentUser, success: true }))
    .catch((err) => ({
      message: err.message,
      code: err.code,
      success: false,
    }));

  if (registerUser.success) {
    return await setDoc(doc(db, "users", registerUser.user.uid), {
      name,
      email,
      username,
      photoUrl,
      dateJoined: moment().format("DD MM YYYY, hh:mm:ss a"),
    })
      .then(() => registerUser)
      .catch((err) => ({
        ...registerUser,
        message: err.message,
        code: err.code,
        success: false,
      }));
  }

  return registerUser;
};

const sendResetPasswordLink = async (email) => {
  return await sendPasswordResetEmail(auth, email)
    .then(() => ({ success: true }))
    .catch((err) => ({
      mode: err.code,
      success: false,
      message: err.message,
    }));
};

const logOut = async () => {
  return await signOut(auth)
    .then(() => ({ success: true }))
    .catch((err) => ({ success: false, message: err.message, code: err.code }));
};

async function findIfUserNameExists(username) {
  const ref = collection(db, "users");
  const q = query(ref, where("username", "==", username));

  return getDocs(q).then((snap) => snap.empty);
}

export const findUserProfile = async (username) => {
  const ref = collection(db, "users");
  const q = query(ref, where("username", "==", username));

  return getDocs(q).then((snap) => {
    let data = [];
    snap.forEach((doc) => data.push(doc.data()));
    return data[0];
  });
};

export {
  logOut,
  findIfUserNameExists,
  signIn,
  register,
  sendResetPasswordLink,
};
