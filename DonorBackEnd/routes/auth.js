const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const json = require("jsonwebtoken");
const config = require("config");

const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword =
    user && user.password
      ? await bcrypt.compare(req.body.password, user.password)
      : false;
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2).max(255),
  });

  return schema.validate(req);
}

module.exports = router;
