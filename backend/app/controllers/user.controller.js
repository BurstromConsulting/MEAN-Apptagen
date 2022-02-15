var fs = require('fs');
const db = require("../models");
const User = db.user;
const Availability = db.availability;
const Style = db.style;
const Config = db.config;
const Company = db.company;
const ObjectId = require('mongoose').Types.ObjectId;


exports.allAccess = (req, res) => {
  User.findAllUsers().then((result) => {
    res.status(200).send(result);
  });
};

exports.findUserById = (req, res) => {
  User.findById(req.params.id, (err, result) => {
    res.status(200).send(result);
  }).select('-password').populate("status.availability style");
};
exports.findUsersByList = (req, res) => {
  console.log(req.body.idList);
  User.find({
    '_id': {
      $in: req.body.idList.map((user) => ObjectId(user._id))
    }
  }, (err, result) => {
    if(err){
      res.status(500).send({message: err});
    }
    res.status(200).send(result);
  }).populate({ path: 'status.availability style', select: '-__v' }).select('-password -__v');
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
    //console.log(err, result);
    res.status(200).send();
  })
};

exports.updateCompany = (req, res, socketio) => {
  const company = {
    company: ObjectId(req.body.companyId)
  }
  User.updateOne({ _id: req.params.id }, { company: company }, (err, result) => {
    Company.findById(req.body.companyId, (erro, resp) => {
      // socketio.custom.broadcastStatus({
      //   status: {
      //     message: req.body.message,
      //     availability: resp,

      //   },
      //   personId: req.params.id})
      // })
      //console.log(err, result);
      res.status(200).send();
    })
  })
}
exports.updateStyle = (req, res, socketio) => {
  const style = {
    style: ObjectId(req.body.style._id)
  }
  console.log(req.body);
  User.updateOne({ _id: req.params.id }, style, (err, result) => {
    User.findById(req.params.id, (erro, resp) => {
      if (erro) {
        res.status(500).send({ message: erro });
      }
      else {
        // console.log("else 1");
        // TO-DO: Re-write this section as a Websocket event for a "Style/updated"-event
        //From Here:
        Config.find((err, result) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          else {
            // console.log("else 2");
            result.forEach(element => {
              // console.log(element);
              element.users.forEach(user => {
                // console.log(user);
                if (user._id == req.params.id) {
                  // console.log(user);
                  console.log(element);
                  socketio.custom.broadcastConfig(element);
                }
              })
            })
          }
        }).populate({ path: 'users', select: '-password -__v' }).select('-__v');
        //To Here.
        res.status(200).send(resp);
      }
      // socketio.custom.broadcastStatus({
      //   status: {
      //     message: req.body.message,
      //     availability: resp,

      //   },
      //   personId: req.params.id})
      // })
      //console.log(err, result);
    }).select('-password').populate("status.availability style").populate("roles");
  })
}

exports.updateImage = (req, res, socketio) => {
  console.log(req.body);
  User.updateOne({ _id: req.params.id }, { image: req.body.image }, (err, result) => {
    User.findById(req.params.id, (erro, resp) => {
      if (erro) {
        res.status(500).send({ message: erro });
      }
      else {
        res.status(200).send(resp);
      }
      // socketio.custom.broadcastStatus({
      //   status: {
      //     message: req.body.message,
      //     availability: resp,

      //   },
      //   personId: req.params.id})
      // })
      //console.log(err, result);
    }).select('-password').populate("status.availability style").populate("roles");
  })
}

exports.tokenCheck = (req, res) => {
  res.status(200).send("Token Ok.");
}