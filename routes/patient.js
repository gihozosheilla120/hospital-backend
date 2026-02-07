const mongoose = require("mongoose");
const Patient = require("../model/patient");
const express = require("express");

const router = express.Router();

router.post("/patient", async(req,res) => {
try{
    const {name, gender, age , number, email } = req.body;

    const patient = new Patient({
        name,gender,age,number,email
    });
    await patient.save();
    res.status(201).json("Patient saved successfully!")
}
 catch(error){
    res.status(500).json("Server issue")
 }
});

router.get("/get", (req,res) => {
    res.send("your patient side is working perfectly")
});

module.exports = patient;