const { findUserFromEmail } = require("../firebase/functions");
const bcrypt = require("bcrypt");
const { createTokens } = require("../middlewares/verifyToken");

const tryLogin = async (
  email,
  password,
  accessTokenSecret,
  refreshTokenSecret
) => {
  const user = await findUserFromEmail(email);
  if (!user) {
    throw new Error("User doesn't exist");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const [token, refreshToken] = await createTokens(
    user,
    accessTokenSecret,
    refreshTokenSecret + user.password
  );

  return { token, refreshToken };
};

module.exports = { tryLogin };
