const mongoose = require("mongoose");
const Joi = require("joi");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    plants: {
      type: [String],
      required: true,
    },
    dateAdopted: {
      type: Date,
      default: Date.now,
      required: true,
    },
  })
);

module.exports.Cart = Cart;

module.exports.validate = (object) => {
  const schema = Joi.object({
    plants: Joi.array().items(Joi.string().min(3).max(50)).required(),
  });

  return schema.validate(object);
};
