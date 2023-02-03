const mongoose = require("mongoose");
const Joi = require("joi");
const { User } = require("./user");

const BloodReq = mongoose.model(
  "BloodReq",
  new mongoose.Schema({
    address: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    unit: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    group: {
      type: String,
      required: true,
      maxlength: 10,
      minlength: 2,
    },
    isFullfilled: {
      type: Boolean,
      default: false,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    location: {
      type: new mongoose.Schema({
        lat: Number,
        lon: Number,
      }),
    },
    requestee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);

function validateBloodReq(req) {
  const schema = Joi.object({
    address: Joi.string().min(3).max(250).required(),
    unit: Joi.number().min(1).max(10).required(),
    group: Joi.string().min(2).max(10).required(),
    location: Joi.object().optional(),
    requestee: Joi.string().required(),
  });

  return schema.validate(req);
}

exports.BloodReq = BloodReq;
exports.validate = validateBloodReq;
