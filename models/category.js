const mongoose = require("mongoose");
const Joi = require("joi");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports.validate = (object) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(object);
};

module.exports.Category = Category;
module.exports.CategorySchema = CategorySchema;
