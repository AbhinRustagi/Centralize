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

const firebaseConfig = {};

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

export { signIn, register };
