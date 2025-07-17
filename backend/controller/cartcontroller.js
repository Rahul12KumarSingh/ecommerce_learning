const Cart = require("../models/cart");
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
    try {
        const {userId, productId, quantity } = req.body;
        const cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await Cart.create({ userId, productId, quantity });
        }

        res.json({message: "Product added to cart"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        await Cart.deleteOne({ userId, productId });


        res.json({ message: "Product removed from cart" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
       const cartItems = await Cart.find({ userId }).populate('productId');

        console.log("cart Items :" , cartItems);
        
        let total = 0;
        cartItems.forEach(item => {
            total += item.Product.price * item.quantity;
        });

        let discount = 0; // giving the discount to the user....
        let discountedTotal = total - (total * discount);
        
        res.json({ cartItems, total, discount: discount * 100, discountedTotal });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
