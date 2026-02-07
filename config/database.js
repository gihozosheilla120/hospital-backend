const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGO_URI;

const db = async() =>{
    try{
       await mongoose.connect(URI);
        console.log("DB is connected well");
    }
    catch(error)
    {console.log(error.message)}
}

module.exports = db;