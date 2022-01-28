const express = require("express");
const serverless = require("serverless-http");
const app = express();
const cors = require("cors");
const { verifyToken } = require("./middlewares/verifyToken");
const { registerUser } = require("./auth/register");
const { tryLogin } = require("./auth/login");
const { getUserFromId } = require("./firebase/functions");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors("*"));

const router = express.Router();

router.get("/getUserProfileDetails", verifyToken, async (req, res) => {
  try {
    const { name, email, username, displayUrl } = await getUserFromId(
      req.user.id
    );

    return res.status(200).json({ name, email, username, displayUrl });
  } catch (e) {
    return res.status(401).json({ ok: false, message: e.message });
  }
});

router.get("/getTimers", verifyToken, (req, res) => {});
router.post("/createTimer", verifyToken, async (req, res) => {});
router.patch("/updateTimer", verifyToken, async (req, res) => {});
router.patch("/deleteTimer", verifyToken, async (req, res) => {});

router.get("/getSettings", verifyToken, (req, res) => {});
router.patch("/updateSettings", verifyToken, (req, res) => {});

router.post("/register", async (req, res) => {
  const { name, username, email, password, displayUrl } = req.body;
  try {
    return await registerUser(name, email, password, username, displayUrl).then(
      (tokens) => res.status(201).json({ ok: true, ...tokens })
    );
  } catch (e) {
    return res.status(409).json({ ok: false, message: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    return await tryLogin(
      email,
      password,
      process.env.ACCESS_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET
    ).then((tokens) => res.status(202).json({ ...tokens, ok: true }));
  } catch (e) {
    return res.status(401).json({ ok: false, message: e.message });
  }
});

router.get("/", (req, res) => {
  console.log(req.body);
  res.json({ path: "Home", name: "Abhin" });
});

app.use("/.netlify/functions/api", router);

exports.handler = serverless(app);
