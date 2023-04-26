const router = require("express").Router();
const User = require("../models/user.js");
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");

//REGISTER
router.post('/register' ,async (req,res) =>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(user)return res.status(500).json({message:"user not exists"});
        const salt = await bcrypt.genSalt(5)
        const hash = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({...req.body,password:hash})
        await newUser.save();
        res.status(200).json(newUser);
    }catch(err){
        res.status(500).json(err);
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        !user && res.status(401).json("Wrong User Name");


        // const originalPassword = await bcrypt.compare(req.body.password, user.password)
        
        // !originalPassword&& 
        //     res.status(401).json("Wrong Password");
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;