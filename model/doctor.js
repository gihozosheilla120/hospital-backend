const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const doctorschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    workerId:{
        type: String,
        required: true,
        unique: true
    },

    workerPassword:{
        type: String,
        minlength: 6
    },
    department:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    
});

doctorschema.pre("save", async function() { 
    if(!this.isModified("workerPassword")) return;

    const salt = await bcrypt.genSalt(10);
    this.workerPassword = await bcrypt.hash(this.workerPassword, salt);

    
    
})

const Doctor = new mongoose.model("Doctor", doctorschema);

module.exports = Doctor;