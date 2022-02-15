const mongoose = require("mongoose");

const Company = mongoose.model(
    "Company",
    new mongoose.Schema({
        name: String,
        location: String,
        fontColor: String,
        image: String,
    })
)
module.exports = Company;