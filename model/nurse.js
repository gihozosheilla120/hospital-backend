const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        unique: true
    },

    workerPassword:{
        type: String,
        required: true,
        unique: true
    },
    
    email:{
        type:String,
        required:true,
        unique: true
    }

});

nurseschema.pre("save", async function(){
    if(!this.isModified("workerPassword"))
      return;
    
    const salt = await bcrypt.genSalt(10);
    this.workerPassword = await bcrypt.hash(this.workerPassword,salt);
    
})

module.exports = new mongoose.model("nurse", nurseschema);