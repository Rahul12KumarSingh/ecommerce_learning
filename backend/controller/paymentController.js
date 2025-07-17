const braintree = require('braintree');
const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');
dotenv.config();

const Order = require('../models/order');
const user = require('../models/user');


const sessionStore = new Map();

console.log("Braintree environment:", process.env.merchantId);
console.log("Braintree public key:", process.env.publicKey);
console.log("Braintree private key:", process.env.privateKey);

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.merchantId,
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey,
});



const paymentTokenController = async (req, res) => {
    const { cartItems } = req.body;

    const email = req.user.email ;

    const userInfo = await user.findOne({ email });
    console.log("user Info : "  , userInfo);

    if (!userInfo) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Invalid session request' });
    }

    const sessionId = uuidv4();
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    sessionStore.set(sessionId, {
        userId: userInfo._id,
        cartItems,
        amount: totalAmount,
        createdAt: Date.now(),
    });

    gateway.clientToken.generate({}, (err, response) => {

        if (err) {
            console.error('Error generating client token:', err);
            return res.status(500).json({ error: 'Failed to generate client token' });
        };

        res.status(200).json({ clientToken: response.clientToken, sessionId });
    });

}



const checkoutController = async (req, res) => {
    const { nonce, sessionId } = req.body;

    if (!nonce || !sessionId || !sessionStore.has(sessionId)) {
        return res.status(400).json({ success: false, message: 'Invalid session or nonce' });
    }
     
    console.log("payment processing started....");

    const session = sessionStore.get(sessionId);

    // Optional: invalidate session after 10 min
    if (Date.now() - session.createdAt > 10 * 60 * 1000) {
        sessionStore.delete(sessionId);
        return res.status(403).json({ success: false, message: 'Session expired' });
    }

    console.log("amount deducated from user cart : ", session.amount);
    try {
        const result = await gateway.transaction.sale({
            amount: session.amount, // ✅ amount must come from frontend securely
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            },
        });

        if (result.success) {

            const newOrder = await Order.create({
                userId : session.userId,
                items: session.cartItems,
                amount: session.amount,
                transactionId: result.transaction.id
            });


            sessionStore.delete(sessionId);

            res.status(200).json({
                success: true,
                transaction: result.transaction,
                message: 'Payment successful and order created.',

            });

            console.log("paymemt processing...");

        } else {
            res.status(400).json({
                success: false,
                message: result.message,
            });
        }
    } catch (err) {
        console.error('Checkout Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {
    paymentTokenController,
    checkoutController
};
