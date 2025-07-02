const Product = require("../models/product");


// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, productImg , productDescription  , price   } = req.body;


        if (!name || !price) {
            return res.status(400).json({ error: "Product name and price are required." });
        }


        const product = await Product.create({ name , productImg ,  productDescription , price });


        res.status(201).json({ message: "Product added successfully", product });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//delete product...
exports.deleteProduct = async(req , res)=>{
      try{

        const {id} = req.params ;

        if(!id){
             return res.status(400).json({
                error : "product id is required!!!" ,
             })
        }

        const product = await Product.deleteOne({id });

        return res.json({
            message : "product deleted successfully!!!" ,
            product : product ,
        })

      }catch(error){
          res.status(500).json({
             error : error.message ,
          })
      }
}