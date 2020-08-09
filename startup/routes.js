const express = require("express");
const plants = require("../routes/plants");
const categories = require("../routes/categories");
const users = require("../routes/users");
const auth = require("../routes/auth");
const carts = require("../routes/carts");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/plants", plants);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/carts", carts);
  app.use(error);
};
