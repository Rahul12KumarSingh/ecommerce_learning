const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productImg : {
          type : String ,
    } ,

    productDescription: {
        type: String,
    } ,  

    price: {
        type: Number,
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('product' , productSchema) ;