const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        name: String,
        title: String,
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        status:{
            message: String,
            availability: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Availability"
            }
        },
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        style: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Style"
        },
        image: String
    })
);

User.findAllUsers = async () => {return await User.find().select('-password').populate("status.availability style")};

module.exports = User;