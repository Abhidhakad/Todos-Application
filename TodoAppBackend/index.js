const express = require('express');
require('dotenv').config();
const connectWithDb = require('./config/database');
const cookieParser = require('cookie-parser');
const router = require('./routes/todo');
const cors = require('cors');
const app = express();

//mounting 
app.use(express.json()); 
app.use(cookieParser());
app.use(cors())

app.use('/todo/api',router);

//db connection succesfully
connectWithDb();
const fileUpload = require("express-fileupload");
// const { cloudnairyconnect } = require("./config/cloudinary");

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp",
    })
  );

app.listen(process.env.PORT,()=>{
    console.log("Server started at port ",process.env.PORT);
})

app.get("/",(req,res)=>{
    res.send("<h1> jai shree Krishna: <h1>")
})
