const db = require("../models");
const User = db.user;
const Availability = db.availability;
const Style = db.style;
const Config = db.config;
const Company = db.company;
const ObjectId = require('mongoose').Types.ObjectId;

// Returns all users for publicly available content

exports.allAccess = (req, res) => {
  User.findAllUsers().then((result) => {
    res.status(200).send(result);
  });
};

// Individual Getter and a Getter for an Array of users

exports.findUserById = (req, res) => {
  User.findById(req.params.id, (err, result) => {
    res.status(200).send(result);
  }).select('-password').populate("status.availability style");
};
exports.findUsersByList = (req, res) => {
  User.find({
    '_id': {
      $in: req.body.idList.map((id) => ObjectId(id))
    }
  }, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    res.status(200).send(result);
  }).populate({ path: 'status.availability style', select: '-__v' }).select('-password -__v');
};

// Requests admin content, also used to confirm you're an admin

exports.adminBoard = (req, res) => {
  User.findById(req.params.id, (err, result) => {
    res.status(200).send(result);
  }).select('-password').populate("status.availability").populate("roles");

};

// Unused request/Function
// To-Do: Implement a moderator view to support things like setting a config to a device.

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// Updates a users status/availability then notifies all configs/devices that have that user in it to update their availability.

exports.updateStatus = (req, res, socketio) => {
  const status = {
    message: req.body.message,
    availability: ObjectId(req.body.availabilityId)
  }
  User.updateOne({ _id: req.params.id }, { status: status }, (err, result) => {
    Availability.findById(req.body.availabilityId, (erro, resp) => {
      socketio.custom.broadcastStatus({
        status: {
          message: req.body.message,
          availability: resp,

        },
        personId: req.params.id
      })
    })
    res.status(200).send();
  })
};

// Updates a users Company, currently ua unimplemented functionality.
// To-do: Add sorting users by what Company they belong to and expanding Admin view Functionality based on sub-categories with Update Company.

exports.updateCompany = (req, res, socketio) => {
  const company = {
    company: ObjectId(req.body.companyId)
  }
  User.updateOne({ _id: req.params.id }, { company: company }, (err, result) => {
    Company.findById(req.body.companyId, (erro, resp) => {
      res.status(200).send();
    })
  })
}

// Update what style ID the user is pointing at, then notifies all Devices with a Config that user belongs to to update their view.

exports.updateStyle = (req, res, socketio) => {
  User.updateOne({ _id: req.params.id }, { style: ObjectId(req.body.styleId) }, (err, result) => {
    User.findById(req.params.id, (erro, resp) => {
      if (erro) {
        res.status(500).send({ message: erro });
      }
      else {
        // TO-DO: Re-write this section as a Websocket event for a "Style/updated"-event
        //From Here:
        Config.find((err, result) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          else {
            result.forEach(element => {
              element.users.forEach(user => {
                if (user._id == req.params.id) {
                  socketio.custom.broadcastConfig(element);
                }
              })
            })
          }
        }).populate({ path: 'users', select: '-password -__v' }).select('-__v');
        //To Here.
        console.log(resp);
        res.status(200).send(resp);
      }
    }).select('-password').populate("status.availability style").populate("roles");
  })
}

// Update what image the user.image value is referencing, then notifies all Devices with a Config that user belongs to to update their view.

exports.updateImage = (req, res, socketio, dataToUpdate) => {
  User.updateOne({ _id: req.params.id }, dataToUpdate, (err, result) => {
    User.findById(req.params.id, (erro, resp) => {
      if (erro) {
        res.status(500).send({ message: erro });
      }
      else {
        // TO-DO: Re-write this section as a Websocket event for a "image/updated"-event
        //From Here:
        Config.find((err, result) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          else {
            result.forEach(element => {
              element.users.forEach(user => {
                if (user._id == req.params.id) {
                  socketio.custom.broadcastConfig(element);
                }
              })
            })
          }
        }).populate({ path: 'users', select: '-password -__v' }).select('-__v');
        //To Here.
        res.status(200).send(resp);
      }
    }).select('-password').populate("status.availability style roles");
  })
}

exports.tokenCheck = (req, res) => {
  res.status(200).send("Token Ok.");
}