const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const { auth } = require("./firebase/admin");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const extractTokenFromAuthHeader = (value) => {
  return value.split(" ")[1];
};

const verifyToken = async function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ err: "Authorization Header not found." });
  }

  const token = extractTokenFromAuthHeader(req.headers.authorization);

  return await auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      req.uid = uid;
      return next();
    })
    .catch((err) => {
      return res.status(404).json({ err });
    });
};

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ path: "Home", name: "Abhin" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ path: "Home", name: "Abhin" });
});

app.use("/.netlify/functions/api", router);

exports.handler = serverless(app);
