const { isValidObjectId } = require("mongoose");
const db = require("../models");
const Device = db.device;
const Config = db.config;
const ObjectId = require('mongoose').Types.ObjectId;

// Device getters for various data needs.

exports.getAllDevices = (req, res) => {
    Device.find((err, result) => {
      res.status(200).send(result);
    }).populate({ path: 'config', select: '-users -__v' }).select('-__v');
  };
exports.getDeviceById = (req, res) => {
    Device.findOne({uuid:req.params.id}, (err, result) => {
        res.status(200).send(result);
      }).populate({ path: 'config', select: '-__v' }).select('-__v');
};

// Updates the Device and assigns a new config to it, then assigns it to the room that belongs to the Room/ConfigID

exports.updateDeviceConfig = (req, res, socketio) => {
    const config = !!req.body.config ? ObjectId(req.body.config._id) : null;
    Device.findOneAndUpdate({uuid: req.params.id}, {name: req.body.device.name, location: req.body.device.location, config: config}, (err, result) => {
        
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else{
            if(!!config){
                Config.findById(config, (errr, resp) =>  {
                    socketio.custom.configUpdate(req.params.id, resp);

                });
            }
            else{
                socketio.custom.configUpdate(req.params.id, null);
            }
            res.send(result);
        }
    }).populate('config').select('-__v');
};

// This is being called when a new device UUID connects to the server, to create the device in our database and assign it a name to be referenced in the Device View.

exports.createDevice = (req, res) => {
    const device = new Device({
        uuid: req.body.deviceId,
        name: "New Device: "+req.body.deviceId,
        location: req.body.location
        });
    device.save((err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else{
            res.send(result);
        }
    });
};

// Deletes device from Database.

exports.deleteDevice = (req, res) => {
    Device.deleteOne({uuid: req.params.id},(err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(result);
    });
};