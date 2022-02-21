const db = require("../models");
const Style = db.style;

const ObjectId = require('mongoose').Types.ObjectId;

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

exports.saveStyle = (req, res, dataToUpdate) => {
    //console.log(req.body);
    Style.findOneAndUpdate({ _id: new ObjectId(req.body.id) }, dataToUpdate, { upsert: true },  (err, doc) => {
        if (err) {
            return res.send(500, { error: err });
        }
        Style.find((err, result) => {
            res.status(200).send(result);
            // console.log(result);
        }).select("-__v");
    });
};

exports.updateStyle = (req, res, dataToUpdate) => {
    Style.findOneAndUpdate({ _id: req.params.id }, dataToUpdate,
        (err, result) => {
            //console.log(result);
            if (err) {
                res.status(500).send({ message: err });
                return;
            } else {
                Style.findById(req.params.id, (error, resp) => {
                    if (error) {
                        res.status(500).send({ message: error });
                        return;
                    }
                    else {
                        res.status(200).send(resp);
                    }
                })
                // res.status(200).send(result);
            }

        }).select('-__v');

};
