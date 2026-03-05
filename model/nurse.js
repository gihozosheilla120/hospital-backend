const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const nurseschema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        maxlength:50,
        trim:true,
        minlength:2,
        match: /^[A-Za-z\s]+$/
    },
    gender:{
        type: String,
        required: true,

    },

    workerId:{
        type: String,
        required: true,
        unique: true
    },

    workerPassword:{
        type: String,
        required: true,

    },
    
    email:{
        type:String,
        required:true,
        
    }

});

nurseschema.pre("save", async function(){
    if(!this.isModified("workerPassword"))
      return;
    
    const salt = await bcrypt.genSalt(10);
    this.workerPassword = await bcrypt.hash(this.workerPassword,salt);
    
})

module.exports = new mongoose.model("nurse", nurseschema);