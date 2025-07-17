const express = require('express');

const router = express.Router();

const { getAllOrders } = require('../controller/orderController');
const authMiddleware = require('../middleware/authmiddleware');



// Route to get orders for a user
router.get('/', authMiddleware, getAllOrders);

module.exports = router ;