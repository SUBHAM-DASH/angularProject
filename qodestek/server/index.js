const express = require("express");
const connectTOmongoose = require("./db");
connectTOmongoose();
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
require('dotenv').config();
const userRouter = require('./routes/auth.router');
const productRouter = require('./routes/product.router');
const dotenv= require('dotenv');
const port = process.env.PORT || 3000;
dotenv.config();

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Available routes
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);


app.listen(port,()=>{
  console.log(`app running on port ${port}`);
})
