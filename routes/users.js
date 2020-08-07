const express = require("express");
const _ = require("lodash");
const { User, validate } = require("../models/user");

const route = express.Router();

route.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(`User already registered`);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();

  res.send(_.pick(user, ["_id", "username", "email"]));
});

route.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res
      .status(404)
      .send(`The user with the ID ${req.params.id} was not found.`);
  res.send(_.pick(user, ["_id", "username", "email"]));
});

module.exports = route;
