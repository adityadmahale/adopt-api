const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");

const route = express.Router();

route.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(5).max(50).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(true);
});

module.exports = route;
