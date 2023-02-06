 // libraries
 const express = require("express"); // create server
 const app = express();

 const mongoose = require("mongoose");
 const dotenv = require("dotenv");
 const helmet = require("helmet");
 const morgan = require("morgan");

 dotenv.config(); 

 mongoose.set("strictQuery", false); // got a deprecation warning,, set default to false? could be true...
 mongoose.connect(process.env.MONGO_URL, () => {
   console.log("Connected to Database");
 });



 app.listen(8800,()=>{
     console.log("Backend Server Running")
 }) // port 