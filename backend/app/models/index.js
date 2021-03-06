const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.availability = require("./availability");
db.config = require("./config");
db.device = require("./device.model");
db.ROLES = ["user", "admin", "moderator"];
db.style = require("./style.model");
db.company = require("./company");
db.STATUS = [{status: "Tillgänglig", color: "#22F21A"}, {status: "Rast", color: "#F6F22B"}, {status: "Borta", color: "#244AFB"}, {status: "Upptagen", color: "#DA423D"}]

module.exports = db;
