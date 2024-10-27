//imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app= express();
app.use(bodyParser.json());
app.use(cors());

//routes
const userRoutes =  require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const port = process.env.PORT || 8000;
dotenv.config({path:"./config.env"})

//db connection
 mongoose.connect(process.env.DB_CONNECTION_STRING).then(()=>{
    console.log('Db connection success')
 }).catch((err)=>{
    console.log(err);
 })

 //routes
app.use("/api/", userRoutes);
app.use("/api/", transactionRoutes);

//port
 app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
 })