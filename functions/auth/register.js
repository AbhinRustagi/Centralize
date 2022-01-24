const {
  createUser,
  findUserFromEmail,
  checkIfUsernameExists,
} = require("../firebase/functions");
const bcrypt = require("bcrypt");
const { createTokens } = require("../middlewares/verifyToken");

const registerUser = async (name, email, password, username, displayUrl) => {
  const userCheck = await findUserFromEmail(email);

  if (userCheck) {
    throw new Error("Email address already in use.");
  }

  if (await checkIfUsernameExists(username)) {
    throw new Error("Username taken.");
  }

  const hashedPassword = await bcrypt.hash(password, 14);
  const user = { name, email, username, displayUrl };

  const res = await createUser({ password: hashedPassword, ...user });
  if (!res.ok) throw new Error("Registration failed.");

  return await createTokens(
    { ...user, id: res.id },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_SECRET
  ).then(([token, refreshToken]) => ({
    token,
    refreshToken,
  }));
};

module.exports = { registerUser };
