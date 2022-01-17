const db = require("../models");
const Availability = db.availability;

exports.findAvailabilities = (req, res) => {
    Availability.find((err, result) => {
      res.status(200).send(result);
    }).select("-__v");
  };