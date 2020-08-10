const express = require("express");
const cors = require("cors");
const { Category, validate } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const route = express.Router();

route.get("/", cors(), async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

route.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res
      .status(404)
      .send(`The category with the ID ${req.params.id} was not found.`);

  res.send(category);
});

route.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  );
  if (!category)
    return res
      .status(404)
      .send(`The category with the ID ${req.params.id} was not found.`);

  res.send(category);
});

route.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({ name: req.body.name });
  await category.save();

  res.send(category);
});

route.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res
      .status(404)
      .send(`The category with the ID ${req.params.id} was not found.`);
  res.send(category);
});

module.exports = route;
