const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute.js");
const mongoose = require("mongoose");
const DB = "mongodb+srv://mahak011001:hello%40123@cluster0.v5wwx.mongodb.net/book-my-meal?retryWrites=true&w=majority"
const categoryRoute = require("./routes/categoryRoute");
const packageRoute = require("./routes/packageRoute");
const itemRoute = require("./routes/itemRoute");
const cartRoute = require("./routes/cartRoutes");
const orderRoute = require("./routes/orderRoute");
const adminRoute = require("./routes/adminRoute");
app.set("view engine","ejs");
mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then((result)=>{
    console.log("connection succesfulll");
}).catch(err=>{
    console.log("connection failed");
});
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/user",userRoute);
app.use("/category",categoryRoute);
app.use("/package",packageRoute);
app.use("/item",itemRoute);
app.use("/cart",cartRoute);
app.use("/order",orderRoute);
app.use("/admin",adminRoute);
app.listen(port,()=>{
    console.log("Server is running");
});