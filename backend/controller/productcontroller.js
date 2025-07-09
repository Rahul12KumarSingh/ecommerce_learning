const Product = require("../models/product");


// Add a new product
exports.addProduct = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { productName, productImg, productDescription, price } = req.body;


        if (!productName || !price) {
            return res.status(400).json({ error: "Product name and price are required." });
        }

        const product = await Product.create({ productName, productImg, productDescription, price });

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get all products
exports.getAllProducts = async (req, res) => {
    // debugger ;
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//delete product...
exports.deleteProduct = async (req, res) => {
    try {
        // debugger ;
        console.log("req params : " , req.params) ;
        const { id } = req.params;

        console.log("product id : ", id);

        if (!id) {
            return res.status(400).json({
                error: "product id is required!!!",
            })
        }

        const product = await Product.findByIdAndDelete(id);

        return res.json({
            message: "product deleted successfully!!!",
            product: product,
        }) ;

    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}