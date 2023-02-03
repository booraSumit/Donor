const config = require("config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");

const register = require("./routes/registerUser");
const auth = require("./routes/auth");
const bReq = require("./routes/bloodReq");
const test = require("./routes/test");
const forgetPassword = require("./routes/forgetPassword");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
if (!config.get("gmail")) {
  console.error("FATAL ERROR: gmail is not defined.");
  process.exit(1);
}
if (!config.get("gmailPassword")) {
  console.error("FATAL ERROR: gmailPassword is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/Donor")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api/register", register);
app.use("/api/user", register);
app.use("/api/auth", auth);
app.use("/api/req", bReq);
app.use("/api/user", bReq);
app.use("/api/test", test);
app.use("/api/me", forgetPassword);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listing on port", port));
