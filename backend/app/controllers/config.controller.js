const { isValidObjectId } = require("mongoose");
const db = require("../models");
const Config = db.config;
const Device = db.device;
const ObjectId = require('mongoose').Types.ObjectId;

exports.findAllConfig = (req, res) => {
    Config.find((err, result) => {
        res.status(200).send(result);
    }).populate({ path: 'users', select: '-password -__v' }).select('-__v');
};
exports.findConfigById = (req, res) => {
    Config.findById(req.params.id, (err, result) => {
        res.status(200).send(result);
    }).populate({ path: 'users', select: '-password -__v' }).select('-__v');
};
exports.updateConfig = (req, res, socketio) => {
    const userIdArray = [];
    req.body.users.forEach(element => {
        userIdArray.push(element);
    });
    Config.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name, users: userIdArray }, (err, result) => {
        //console.log(result);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else {
            Config.findOne({_id: req.params.id}, (errr, resp) => {
                // console.log(resp);
                res.send(resp);
                socketio.custom.broadcastConfig(resp);
            }).select('-__v');
        }
    }).populate({ path: 'users', select: '-password -__v' }).select('-__v');
    
};

exports.createConfig = (req, res) => {
    //console.log(req.body);
    const config = new Config({
        name: req.body.name,
        users: req.body.users.map(user => {
            return ObjectId(user._id);
        })
    });
    config.save((err, result) => {
        //console.log(result);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else {
            res.send(result);
        }
    });
};

exports.deleteConfig = (req, res) => {
    Config.deleteOne({ name: req.body.name }, (err, result) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //console.log(result);
        res.status(200).send(result);
    });
};