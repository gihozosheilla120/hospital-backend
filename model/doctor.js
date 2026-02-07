const mongoose = require("mongoose");

const doctorschema = new mongoose.Schema({
    name:{
        type: String,
        required: True
    },

    workerId:{
        type: Number,
        required: True,
        Unique: True
    },

    workerPassword:{
        type: String,
        required: True,
        Unique: True,
        minlength: 6
    },
    department:{
        type: String,
        required: True,
    },

    email:{
        type: String,
        required: True,
        Unique: True
    },
    
});

const Doctor = new mongoose.model("Doctor", doctorschema);

module.exports = Doctor;