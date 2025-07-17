const express = require('express');

const router = express.Router();

const { paymentTokenController, checkoutController } = require('../controller/paymentController');
const authMiddleware = require('../middleware/authmiddleware');

// Route to get Braintree client token
router.post('/token', authMiddleware, paymentTokenController);

// Route to handle checkout
router.post('/checkout', authMiddleware, checkoutController);

module.exports = router;