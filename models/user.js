const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

module.exports.User = User;

module.exports.validate = (object) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(object);
};
