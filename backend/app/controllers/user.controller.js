const db = require("../models");
const User = db.user;


exports.allAccess = (req, res) => {
  User.findAllUsers().then((result) => {
    res.status(200).send(result);
  });
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};