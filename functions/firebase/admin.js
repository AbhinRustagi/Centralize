const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../service.json");

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = getFirestore(app);

module.exports = { db };
