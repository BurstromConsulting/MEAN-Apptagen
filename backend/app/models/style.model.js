const mongoose = require("mongoose");
const { schema } = require("./user.model");
const Style = mongoose.model(
    "Style",
    new mongoose.Schema({
        name: String,
        background: String,
        fontcolor: String,
    })
)

module.exports = Style;