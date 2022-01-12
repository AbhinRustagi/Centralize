const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  res.json({ path: "Home", name: "Abhin" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ path: "Home", name: "Abhin" });
});

app.use("/.netlify/functions/api", router);

exports.handler = serverless(app);
