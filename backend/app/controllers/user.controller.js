const db = require("../models");
const User = db.user;
const ObjectId = require('mongoose').Types.ObjectId;


exports.allAccess = (req, res) => {
  User.findAllUsers().then((result) => {
    res.status(200).send(result);
  });
};

exports.findUserById = (req, res) => {
  User.findById(req.params.id, (err, result) => {
    res.status(200).send(result);
  }).select('-password').populate("status.availability");
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

exports.updateStatus = (req, res) => {
  console.log(req.body, ObjectId(req.body.availability));
  const status = {
    message: req.body.message,
    availability: ObjectId(req.body.availability)
  }
  User.updateOne({ _id: req.params.id}, {status: status},(err, result) => {
    console.log(err, result);
    res.status(200).send();  
  })
}