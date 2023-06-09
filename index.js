const express = require("express");
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const authRoute = require("./routes/auth.js")
const vendorroute = require("./routes/vendors.js")
const bodyParser = require("body-parser")

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!",))
  .catch((err) => {
    console.log(err);
  });

  app.use('/api/auth',authRoute)
  app.use('/api/vendors',vendorroute)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("app is listening at the port " + port)
}) 