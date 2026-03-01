const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 6,
        maxlength:16
    },
    gender:{
        type: String,
        required: true,
        maxlength: 10
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
        unique: true
    },


});
userschema.pre("save", async function(){
    if(!this.isModified("password")) return;

    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
})

module.exports = new mongoose.model("User", userschema);