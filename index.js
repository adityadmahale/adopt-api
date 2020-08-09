const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
require("express-async-errors");
const error = require("./middleware/error");
const express = require("express");
const mongoose = require("mongoose");
const plants = require("./routes/plants");
const categories = require("./routes/categories");
const users = require("./routes/users");
const auth = require("./routes/auth");
const carts = require("./routes/carts");

process.on("uncaughtException", (ex) => {
  console.log(ex.message);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log("SOMETHING FAILED");
  process.exit(1);
});

if (!config.get("jwtPrivateKey")) {
  throw new Error("jwtPrivateKey is not defined");
}

mongoose
  .connect("mongodb://localhost:27017/adopt")
  .then(() => console.log("Connected to MongoDB"));

const app = express();
app.use(express.json());

app.use("/api/categories", categories);
app.use("/api/plants", plants);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/carts", carts);
app.use(error);

const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
