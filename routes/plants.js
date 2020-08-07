const express = require("express");
const { Plant, validate } = require("../models/plant");
const { Category } = require("../models/category");

const route = express.Router();

route.get("/", async (req, res) => {
  const plants = await Plant.find();
  res.send(plants);
});

route.get("/:id", async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (!plant)
    return res
      .status(404)
      .send(`The plant with the ID ${req.params.id} was not found.`);

  res.send(plant);
});

route.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);

  if (!category)
    return res
      .status(404)
      .send(`The category with the ID ${req.body.categoryId} was not found.`);

  const plant = new Plant({
    name: req.body.name,
    category: { name: category.name, _id: category._id },
    description: req.body.description,
    path: req.body.path,
  });
  await plant.save();

  res.send(plant);
});

route.delete("/:id", async (req, res) => {
  const plant = await Plant.findByIdAndRemove(req.params.id);
  if (!plant)
    return res
      .status(404)
      .send(`The plant with the ID ${req.params.id} was not found.`);
  res.send(plant);
});

module.exports = route;
