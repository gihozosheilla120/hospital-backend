const mongoose = require("mongoose");
const express = require(express);
const app = express();

require("dotenv").config();

app.use(express.json());

const db = require("./config/database");

const userroutes = require("./routes/doctor")
