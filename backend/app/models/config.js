const mongoose = require("mongoose");

const Config = mongoose.model(
    "Config",
    new mongoose.Schema({
        name: String,
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })
)
module.exports = Config;