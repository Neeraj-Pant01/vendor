const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isStaff:{
        type: Boolean,
        default: true,
      },
          city:{
              type:String,
              required:true
            },
            area:{
              type:String,
              required:true
            },
            number:{
                type:String,
                required:true
            },
            qualifications:{
                type:String,
                required:true
            },
            image:{
              type:String,
              required:false
            }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("vendors", vendorSchema);