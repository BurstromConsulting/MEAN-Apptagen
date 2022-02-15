const db = require("../models");
const Style = db.style;

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

exports.updateStyle = (req, res) => {
    Style.findOneAndUpdate({ _id: req.params.id },
         { name: req.body.name, background: req.body.background, fontcolor: req.body.fontcolor },
             (err, result) => {
        //console.log(result);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }else{
            Style.findById(req.params.id, (error, resp) => {
                if (error){
                    res.status(500).send({ message: error});
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
