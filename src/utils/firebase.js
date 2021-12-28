// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcACZFAHkoVChhpNTeqXIyp6NSyH6j0gc",
  authDomain: "pomodoro-2cb1e.firebaseapp.com",
  projectId: "pomodoro-2cb1e",
  storageBucket: "pomodoro-2cb1e.appspot.com",
  messagingSenderId: "123896191879",
  appId: "1:123896191879:web:4e0110d49e3edec4269122",
  measurementId: "G-V2RY0F81BW",
};

initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export { auth, provider };
