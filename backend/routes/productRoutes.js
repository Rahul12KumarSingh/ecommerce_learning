const express = require("express");
const { addProduct , getAllProducts, deleteProduct } = require("../controller/productcontroller");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const isAdmin = require("../middleware/isAdmin.js");

router.post("/add", authMiddleware ,  isAdmin , addProduct); 
router.delete("/delete/:id" , authMiddleware , isAdmin , deleteProduct)
router.get("/" , authMiddleware , getAllProducts) ;

module.exports = router ;