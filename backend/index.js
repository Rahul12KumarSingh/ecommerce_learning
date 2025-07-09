const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
dotenv.config() ;

const cartRoutes = require('./routes/cartRoutes') ;
const authRoutes = require('./routes/authRoutes') ;
const productRoutes = require('./routes/productRoutes') ;

const connectDatabase = require('./config/dbMongo') ;
const app = express() ;

const PORT = process.env.PORT || 5000 ;

app.use(cors()) ;
app.use(express.json()) ;

app.use("/api/cart" , cartRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/products" , productRoutes);

connectDatabase() ;

app.get('/' , (req , res) => {
      res.send('Welcome to the server') ;
}) ;

app.listen(PORT , async () => {
    console.log('Server is running on port 5000') ;
}) ;

