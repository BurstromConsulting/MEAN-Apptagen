const mongoose = require("mongoose");
const { schema } = require("./user.model");
const Availability = mongoose.model(
    "Availability",
    new mongoose.Schema({
        status: String,
        color: String
    })
)

module.exports = Availability;