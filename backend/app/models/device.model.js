const mongoose = require("mongoose");

const Device = mongoose.model(
    "Device",
    new mongoose.Schema({
        uuid: String,
        name: String,
        location: String,
        config:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Config",
                default: null
            }

    })
)
module.exports = Device;