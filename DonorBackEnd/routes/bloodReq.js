const express = require("express");
const router = express.Router();
const _ = require("lodash");
const distance = require("../geo/latLonToDist");

const { BloodReq, validate } = require("../models/bloodReq");

router.get("/pending/:lat/:lon", async (req, res) => {
  const { lat, lon } = req.params;

  let result = await BloodReq.find().populate("requestee", "name email phone");
  result = result.filter(
    (item) =>
      distance(lat, lon, item.location.lat, item.location.lon) &&
      !item.isFullfilled
  );
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  res.send(result);
});

router.get("/requests/:id", async (req, res) => {
  let result = await BloodReq.find({ requestee: req.params.id });
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  res.send(result);
});

router.get("/acceptedList/:id", async (req, res) => {
  let result = await BloodReq.find({ donor: req.params.id }).populate(
    "requestee",
    "name email phone"
  );
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  res.send(result);
});

router.put("/accepted/:id", async (req, res) => {
  const result = await BloodReq.updateOne(
    { _id: req.params.id },
    {
      $set: {
        isFullfilled: true,
        donor: req.body.donorId,
      },
    },
    { new: true }
  );

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  res.send(result);
});

router.get("/donorDetail/:id", async (req, res) => {
  let result = await BloodReq.find()
    .and([{ requestee: req.params.id }, { isFullfilled: true }])
    .populate("donor", "name email phone")
    .select("donor");
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  res.send(result);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let bReq = new BloodReq(
    _.pick(req.body, ["address", "unit", "group", "location", "requestee"])
  );
  bReq = await bReq.save();

  res.send(bReq);
});

module.exports = router;
