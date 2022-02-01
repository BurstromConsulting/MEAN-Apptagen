const { isValidObjectId } = require("mongoose");
const db = require("../models");
const Device = db.device;
const Config = db.config;
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllDevices = (req, res) => {
    Device.find((err, result) => {
        //console.log(result);
      res.status(200).send(result);
    }).populate({ path: 'config', select: '-users -__v' }).select('-__v');
  };
exports.getDeviceById = (req, res) => {
    Device.findOne({uuid:req.params.id}, (err, result) => {
        //console.log(err, result, req.params.id);
        res.status(200).send(result);
      }).populate({ path: 'config', select: '-__v' }).select('-__v');
};
exports.updateDeviceConfig = (req, res, socketio) => {
    const config = !!req.body.config ? ObjectId(req.body.config._id) : null;
    Device.findOneAndUpdate({uuid: req.params.id}, {name: req.body.device.name, location: req.body.device.location, config: config}, (err, result) => {
        
        //console.log(result);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else{
            if(!!config){
                Config.findById(config, (errr, resp) =>  {
                    //console.log("config findy by id ", resp)
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

exports.createDevice = (req, res) => {
    //console.log(req.body);
    const device = new Device({
        uuid: req.body.deviceId,
        name: "New Device: "+req.body.deviceId,
        location: req.body.location
        });
    device.save((err, result) => {
        //console.log(result);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else{
            res.send(result);
        }
    });
};

exports.deleteDevice = (req, res) => {
    Device.deleteOne({uuid: req.params.id},(err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //console.log(result);
        res.status(200).send(result);
    });
};