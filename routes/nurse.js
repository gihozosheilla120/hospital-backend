const mongoose = require("mongoose");

const express = require("express");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const verifyToken= require("../middleware/auth");

const Nurse = require("../model/nurse");

const router = express.Router();


router.post("/nurse/login", async(req,res) => {
    try{
        const {workerId, workerPassword} = req.body;

        const nurse = await Nurse.findOne({workerId});
        if(!nurse) return res.status(403).json({message:"the nurse was not found"});

        const isMatch = await bcrypt.compare(workerPassword, nurse.workerPassword);
        if(!isMatch)return res.status(403).json({message:"invalid credentials"});

        const token = jwt.sign(
            {id:nurse._id, workerId:nurse.workerId},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

       return res.status(200).json({message:"login successful", token})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"invalid information"});
        
    }
}
);

router.post("/nurse", async(req, res) => {
    try{
        const{name, gender, workerId, workerPassword, email} = req.body;

        const nurse = new Nurse({
            name, gender, workerId, workerPassword, email
        })
         
        await nurse.save();
        res.status(201).json("Nurse saved successfully!")
    }
    catch(error){
    console.error(error);
    res.status(500).json({ message: error.message });
}

});

router.get("/nurse/test", verifyToken, (req,res) => {
    res.send(`hello ${req.user.name}, you are logged in successfully`)
});

module.exports = router;