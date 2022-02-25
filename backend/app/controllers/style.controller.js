const db = require("../models");
const Style = db.style;

const Config = db.config;
const ObjectId = require('mongoose').Types.ObjectId;

// Getters from the Styles DB

exports.findStyles = (req, res) => {
    Style.find((err, result) => {
        res.status(200).send(result);
    }).select("-__v");
};

exports.findStyleById = (req, res) => {
    Style.findById(req.params.id, (err, result) => {
        res.status(200).send(result);
    }).select('-__v');
};

// Creates a new Style for the DB, Currently Used for Manually adding more Styles to DB

exports.createStyle = (req, res) => {
    //console.log(req.body);
    const style = new Style({
        name: req.body.name,
        background: req.body.background,
        fontcolor: req.body.fontcolor

    });
    style.save((err, result) => {
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

// Saves the file being uploaded from the Admin View to the DB and assigns it any additional data passed as "DataToUpdate", if it exists then it'll update the image in the DB, otherwise it creates a new Style

exports.saveStyle = (req, res, dataToUpdate) => {
    //console.log(req.body);
    Style.findOneAndUpdate({ _id: new ObjectId(req.body.id) }, dataToUpdate, { upsert: true }, (err, doc) => {
        if (err) {
            return res.send(500, { error: err });
        }
        Style.find((err, result) => {
            res.status(200).send(result);
            // console.log(result);
        }).select("-__v");
    });
};

// Updates the style, currently used for updating Fontcolor, but functionality to add more data in "DataToUpdate" is possible


exports.updateStyle = (req, res, dataToUpdate, socketio) => {
    Style.findOneAndUpdate({ _id: req.params.id }, dataToUpdate,
        (err, result) => {
            //console.log(result);
            if (err) {
                res.status(500).send({ message: err });
                return;
            } else {
                Style.find((error, resp) => {
                    if (error) {
                        res.status(500).send({ message: error });
                        return;
                    }
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
                                    if (user.style._id == req.params.id) {
                                        // console.log("Controller:",user);
                                        // Problemet ligger här med Emits av Style ändringar
                                        console.log("Controller:", element);
                                        socketio.custom.broadcastConfig(element);
                                    }
                                })
                            })
                        }
                    }).populate({ path: 'users', select: '-password -__v' }).select('-__v');
                    res.status(200).send(resp);

                })
                // res.status(200).send(result);
            }

        }).select('-__v');

};
