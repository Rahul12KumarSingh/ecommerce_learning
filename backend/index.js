const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
dotenv.config() ;


const cartRoutes = require('./routes/cartRoutes') ;
const authRoutes = require('./routes/authRoutes') ;
const productRoutes = require('./routes/productRoutes') ;
const cloudRoute = require('./routes/cloudRoutes') ;
const paymentRoutes = require('./routes/paymentRoutes') ;
const orderRoutes = require('./routes/orderRoutes') ;


const connectDatabase = require('./config/dbMongo') ;
const order = require('./models/order');
const app = express() ;

const PORT = process.env.PORT || 5000 ;

app.use(cors()) ;
app.use(express.json()) ;

//routes mapping.....
app.use("/api/cart" , cartRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/products" , productRoutes);
app.use("/api/cloudService" , cloudRoute) ;
app.use("/api/payment" , paymentRoutes) ;
app.use("/api/order" , orderRoutes) ;


connectDatabase() ;



app.get('/' , (req , res) => {
      res.send('Welcome to the server') ;
}) ;


app.listen(PORT , async () => {
    console.log('Server is running on port 5000') ;
}) ;

