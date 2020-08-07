const mongoose = require("mongoose");
const Joi = require("joi");
const { CategorySchema } = require("./category");

const Plant = mongoose.model(
  "Plant",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    category: {
      type: CategorySchema,
      required: true,
    },
    path: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1000,
    },
  })
);

module.exports.validate = (object) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    categoryId: Joi.objectId().required(),
    path: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(1000).required(),
  });

  return schema.validate(object);
};

module.exports.Plant = Plant;
