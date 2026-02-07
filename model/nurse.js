const mongoose = require("mongoose");

const nurseschema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        maxlength:15,
        minlength:6
    },
    gender:{
        type: String,
        required: true,

    },

    workerId:{
        type: String,
        required: true,
        Unique: true
    },

    workerPassword:{
        type: String,
        required: true,
        Unique: true
    },
    
    email:{
        type:String,
        required:true,
        Unique: true
    }

});

module.exports = new mongoose.model("nurse", nurseschema);