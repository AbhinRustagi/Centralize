const jwt = require("jsonwebtoken");
const { getUserFromId } = require("../firebase/functions");

const createTokens = (user, accessTokenSecret, refreshTokenSecret) => {
  const createToken = jwt.sign(
    { user: { id: user.id, username: user.username } },
    accessTokenSecret,
    {
      expiresIn: "3m",
    }
  );

  const createRefreshToken = jwt.sign(
    { user: { id: user.id, username: user.username } },
    refreshTokenSecret,
    { expiresIn: "10d" }
  );

  return Promise.all([createToken, createRefreshToken]);
};

const refreshTokens = async (
  token,
  refreshToken,
  accessTokenSecret,
  refreshTokenSecret
) => {
  let userId = -1;

  try {
    const {
      user: { id },
    } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return { ok: false, message: err };
  }

  if (!userId) {
    return { ok: false, message: "No ID sent in Refresh Token" };
  }

  const user = await getUserFromId(userId);

  if (!user) {
    return { ok: false, message: "No user found." };
  }

  const refreshSecret = refreshTokenSecret + user.password;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (e) {
    return { ok: false, message: "Refresh Token Invalid" };
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    accessTokenSecret,
    refreshSecret
  );
  return {
    ok: true,
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

const verifyToken = async function (req, res, next) {
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(401).json({ ok: false, message: "No Access Token" });
  }

  try {
    const { user } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
  } catch (err) {
    const refreshToken = req.headers["x-refresh-token"];

    if (!refreshToken)
      return res.status(401).json({ ok: false, message: "No Refresh Token." });

    if (refreshToken.exp < new Date().getTime() / 1000)
      return res
        .status(401)
        .json({ ok: false, message: "Refresh Token Invalidated." });

    const newTokens = await refreshTokens(
      token,
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (newTokens.token && newTokens.refreshToken) {
      res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
      res.set("x-token", newTokens.token);
      res.set("x-refresh-token", newTokens.refreshToken);
    }
    req.user = newTokens.user;
  }

  next();
};

module.exports = { verifyToken, refreshTokens, createTokens };
