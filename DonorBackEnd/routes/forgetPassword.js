const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.get("/password/:id", async (req, res) => {
  const result = await User.findById(req.params.id).select("password");
  console.log(result);
  res.send(result);
});

module.exports = router;
