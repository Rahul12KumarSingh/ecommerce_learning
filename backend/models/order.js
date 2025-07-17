const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items : [

    ],

    amount : {
        type: Number,
        required: true
    },

    transactionId: {
        type: String,
        required: true
    } ,

    status : {
        type: String,
        default: 'processing'
    }
    
}, { timestamps: true }) ;

module.exports = mongoose.model('Order', orderSchema);