const router = require("express").Router();
const vendorSchema = require("../models/vendor.js")
const bcrypt = require("bcrypt")

//register a vendor
router.post('/register',async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(req.body.password, salt)
        const newVendor = new vendorSchema({...req.body, password:hashpass})
        await newVendor.save()
        res.status(200).json(newVendor)
    }catch(err){
        res.status(200).json(err)
    }
})

router.post('/login',async(req,res)=>{
    try{
        const vendor = await vendorSchema.findOne({email:req.body.email})

        const validPass = await bcrypt.compare(req.body.password, vendor.password)
        !validPass && res.status(400).send("password is not valid !")

        const {password, ...others} = vendor._doc
        res.status(200).json(others)
    }catch(err){
        res.status(200).json(err)
    }
})

//get all the vendors
router.get('/',async (req,res)=>{
    try{
        const q = req.query
        const filters = {
            ...(q.area && {area:{$regex:q.area, $options:"i"}}),
            ...(q.city && {city:{$regex:q.city, $options:"i"}})
        }
        const vendor = await vendorSchema.find(filters)
        res.status(200).json(vendor)
    }catch(err){
        res.status(400).send(err)
    }
})


module.exports = router