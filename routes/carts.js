const express = require("express");
const auth = require("../middleware/auth");
const { Cart, validate } = require("../models/cart");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const carts = await Cart.find({ userId: req.user._id });

  res.send(carts);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cart = new Cart({
    userId: req.user._id,
    plants: req.body.plants,
  });

  await cart.save();

  res.send(cart);
});

module.exports = router;
