const express = require("express");
const mongoose = require("mongoose");
const categories = require("./routes/categories");

mongoose
  .connect("mongodb://localhost:27017/adopt")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.use("/api/categories", categories);

const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
