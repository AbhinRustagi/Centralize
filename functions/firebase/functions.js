const { db } = require("./admin");
const { v4 } = require("uuid");

const getUserFromId = async (id) => {
  const res = await db.collection("users").doc(id).get();
  if (!res.exists) {
    return false;
  }
  return res.data();
};

const checkIfUsernameExists = async (username) => {
  const snapshot = await db
    .collection("users")
    .where("username", "==", username)
    .get();

  if (snapshot.empty) return false;

  return true;
};

const findUserFromEmail = async (email) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    return false;
  }

  let _ = [];

  snapshot.forEach((doc) => _.push(doc.data()));
  return _[0];
};

const createUser = async (user) => {
  const id = v4();
  return await db
    .collection("users")
    .doc(id)
    .set({ ...user, id })
    .then(() => ({ ok: true, id }))
    .catch(() => ({
      ok: false,
    }));
};

module.exports = {
  getUserFromId,
  checkIfUsernameExists,
  findUserFromEmail,
  createUser,
};
