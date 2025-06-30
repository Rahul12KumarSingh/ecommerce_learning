const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const connectDatabase = async ()=>{
    try{
       await mongoose.connect(process.env.DB_URI);
       console.log("MongoDB Connected");
    }catch(err){
       console.log("Error connecting to MongoDB:", err);
    }
}

module.exports = connectDatabase;