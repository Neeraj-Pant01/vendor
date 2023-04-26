const express = require("express");
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const authRoute = require("./routes/auth.js")
const vendorroute = require("./routes/vendors.js")

const app = express()

app.use(express.json())
app.use(cors())


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use('/api/auth',authRoute)
  app.use('/api/vendors',vendorroute)


app.listen(5000,()=>{
    console.log("app is listening at the port 5000")
}) 