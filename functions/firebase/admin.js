const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth, getIdToken } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("../service.json");

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { app, auth, db };
