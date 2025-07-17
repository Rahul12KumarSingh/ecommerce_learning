const Order = require("../models/order");
const user = require("../models/user");

const getAllOrders = async (req, res) => {

    const userInfo = await user.findOne({ email: req.user.email });

    console.log("Fetching orders for user:", userInfo._id);


    try {
        const orders = await Order.find({ userId: userInfo._id })
            .populate('userId')
            .populate('items.productId').exec();


        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllOrders
};