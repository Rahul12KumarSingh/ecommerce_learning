const Product = require("../models/product");

const {OpenAI} = require("openai");

const context = [
    {
        role: "system",
        content: "You are a helpful assistant that generates product descriptions based on the product name ,and price. keep it concise and informative. avoid using any special characters or emojis in the description. it looks like a product description for an e-commerce website like amazon , flipkart , myntra etc. keep it simple and easy to understand. and size should be less than 50 words" 
    }
] ;

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY || "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",
});

async function generateDescription(productName , price) {

    context.push({
        role: 'user',
        content: `Generate a product description for the product name: ${productName} and price: ₹${price}`
    });


    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: context,
    });

    const responseMessage = response.choices[0].message;

    context.push({
        role: 'assistant',
        content: responseMessage.content
    });
    
    console.log(`${responseMessage.role}: ${responseMessage.content}`);
    return responseMessage.content;
}


// Add a new product
exports.addProduct = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        let { productName, productImg, productDescription, price } = req.body;

        if (!productName || !price) {
            return res.status(400).json({ error: "Product name and price are required." });
        }

        //genereta the product description from the chatGPT API...
        productDescription =  await generateDescription(productName, price)

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