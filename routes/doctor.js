const mongoose = require("mongoose");

const express =require("express");

const Doctor = require("../model/doctor");

const router = express.Router();

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
    res.status(500).json("Server issue");

    }
});

router.get("/try", (req,res) => {
    res.send("The doctor side working correctly")
});

module.exports = doctor;



