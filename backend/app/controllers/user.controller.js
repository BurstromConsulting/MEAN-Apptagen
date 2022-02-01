const db = require("../models");
const User = db.user;
const Availability = db.availability;
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
exports.findUsersByList = (req, res) => {
  User.find({
    '_id': {
      $in: req.body.idList.map((user) => ObjectId(user))
    }
  }, (err, result) => {
    res.status(200).send(result);
  }).populate({ path: 'status.availability', select: '-__v' }).select('-password -__v');
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  User.findById(req.params.id, (err, result) => {
  res.status(200).send(result);
}).select('-password').populate("status.availability").populate("roles");
  
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.updateStatus = (req, res, socketio) => {
  const status = {
    message: req.body.message,
    availability: ObjectId(req.body.availability)
  }
  User.updateOne({ _id: req.params.id}, {status: status},(err, result) => {
    Availability.findById(req.body.availability, (erro, resp) => {
      socketio.custom.broadcastStatus({
        status: {
          message: req.body.message,
          availability: resp,
          
        },
        personId: req.params.id})
      })
    //console.log(err, result);
    res.status(200).send();  
  })
}