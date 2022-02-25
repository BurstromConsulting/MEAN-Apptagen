const db = require("../models");
const Availability = db.availability;

// Gets all availabilities from the database to show it to the User when the user wants to set their status.


exports.findAvailabilities = (req, res) => {
    Availability.find((err, result) => {
      res.status(200).send(result);
    }).select("-__v");
  };

  // TO-DO: Add functionality to make new types of availabilities and make them available in the database.
  