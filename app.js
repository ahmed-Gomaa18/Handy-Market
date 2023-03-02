const express = require('express');
const connectToDB = require('./DB/connectionToDB');

const bodyparser = require("body-parser");

const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

// Connection to Database
connectToDB()

// middelWare to read & set Cookie & API with front-end
app.use(cors({ origin: true, credentials: true }));


// middelWare to Understand response
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: true}));
// parse application/json
app.use(bodyparser.json());

// Router
const authRouter = require('./routes/auth.router')
const productRouter = require('./routes/product.router');
const orderRouter = require('./routes/order.router');
const cartRouter = require('./routes/cart.router');
const reviewRouter = require('./routes/review.router');
const categoryRouter = require('./routes/category.router');
const systemRouter = require('./routes/system.router');
const balanceRouter = require('./routes/balance.router')
const userRouter = require('./routes/user.router');


// Main URLs
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order' , orderRouter);
app.use('/api/v1/cart' , cartRouter);
app.use('/api/v1/review' , reviewRouter);
app.use('/api/v1/category' , categoryRouter);
app.use('/api/v1/system' , systemRouter);
app.use('/api/v1/image/uploads' , express.static(path.join(__dirname ,'./uploads' )));

app.use('/api/v1/balance', balanceRouter);
app.use('/api/v1/user' , userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{console.log('http://localhost:' + PORT )});