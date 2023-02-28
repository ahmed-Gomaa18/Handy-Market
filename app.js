const express = require('express');
const connectToDB = require('./DB/connectionToDB');

const bodyparser = require("body-parser");

const cors = require('cors');

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


// Main URLs
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order' , orderRouter);





const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{console.log('http://localhost:' + PORT )});
