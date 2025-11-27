const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const path = require('path')

const DatabaseCon = require('./app/config/DatabaseCon')

DatabaseCon()
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.json())
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
];
app.set("trust proxy", 1);
app.use(
  cors({
    origin:function (origin , callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.includes(origin)){
        callback(null, true)
      }else{
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true
  })
);

const productRouter = require('./app/routes/ProductRoutes')
app.use(productRouter)

const categoryRouter = require('./app/routes/CategoryRoutes')
app.use(categoryRouter)


const port = 5000
app.listen(port, () => {
  console.log("Sever is running on http://localhost:5000")
})