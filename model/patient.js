const mongoose = require("mongoose");

const patientscheme = new mongoose.Schema({
    name:{
        type:"string",
        required: true
    },

    gender:{
        type:"string",
        required: True
    },

    age:{
        type: Number,
        required: false
    },

    number:{
        type: Number,
        required: True,
        Unique: True
    },

    email:{
        type:"string",
        Unique: True,
        required: True
    }

});

const patient = new mongoose.model("Patient", patientscheme);

module.exports = patient;