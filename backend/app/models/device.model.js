const mongoose = require("mongoose");

const Device = mongoose.model(
    "Device",
    new mongoose.Schema({
        uuid: String,
        name: String,
        location: String,
        refreshInterval: {
            type: Number,
            default: 3600
        },
        config:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Config",
                default: null
            }

    })
)
module.exports = Device;