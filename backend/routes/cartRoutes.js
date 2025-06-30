const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controller/cartcontroller");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

router.post("/add", authMiddleware , addToCart);
router.post("/remove", authMiddleware , removeFromCart);
router.get("/:userId", authMiddleware , getCart);

module.exports = router;
