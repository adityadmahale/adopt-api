const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost:27017/adopt")
    .then(() => console.log("Connected to MongoDB"));
};
