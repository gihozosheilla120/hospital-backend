const mongoose = require("mongoose");

const express =require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/auth");

const Doctor = require("../model/doctor");

const router = express.Router();


router.post("/doctor/login", async(req, res) => {
    try{
        const{workerId, workerPassword} = req.body;

       const doctor = await Doctor.findOne({workerId});
       if(!doctor) return res.status(400).json({message:"the doctor not found"});

       const isMatch = await bcrypt.compare(workerPassword, doctor.workerPassword);
       if(!isMatch) return res.status(400).json({message:"invalid information"});

       const token = jwt.sign(
        {id:doctor._id, name:doctor.name, workerId:doctor.workerId},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
       );

       res.status(200).json({message:"login successful", token})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

router.post("/doctor", async(req, res) => {
    try{
        const{name, workerId , workerPassword , department , email} = req.body;
        
        const doctor = new Doctor({
            name, workerId, workerPassword, department, email
        });

        await doctor.save();

        res.status(201).json("The doctor saved successfully!")

    }
    catch(error){
    console.error(error);
    res.status(500).json(error.message)

    }
});

router.get("/doctor/test", verifyToken, (req,res) => {
    res.send(`Hello ${req.user.name}, you are logged in successful`)
});

module.exports = router;



