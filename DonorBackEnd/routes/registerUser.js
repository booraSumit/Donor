const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(
    _.pick(req.body, ["name", "email", "phone", "password", "category"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["name", "email", "phone", "_id", "category"]));
});

router.delete("/delete/:id", async (req, res) => {
  const result = await User.findByIdAndRemove(req.params.id);
  res.send(result);
});

module.exports = router;
