const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Availability = require("../models/availability");
const ObjectId = require('mongoose').Types.ObjectId;

exports.signup = (req, res) => {
  // The standard User Signup form, hardcoded initial style and image and Password Hash.
  const user = new User({
    username: req.body.username,
    image: "picture_default.png",
    style: ObjectId("620b603b4f1af9b8fbfc65e0"),
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  // Saves User to Database from Input of the Signup Form
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // Checks if Request includes Roles for said user, e.g making a Admin User would need to have this field included to not default to ROLE_USER
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      /*
      Performs a promise to guarantee that data will be available for the Document "Role" with name 'user'
      and that we have the document "Availability" with the name 'Tillgänglig' before automatically assigning
       these two documents to be linked to each new User that signs up. 
      */
      Promise.all([
        Role.findOne({ name: "user" }),
        Availability.findOne({ status: "Tillgänglig"})
      ]).then(([role,availability]) => {
        user.roles = [role._id];
        user.status = {message: "", availability: availability._id};
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        })
        res.send({ message: "User was registered successfully!" });
      })
    }
  });
};
  // 
  exports.signin = (req, res) => {
    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .populate("status.availability")
      .exec(async(err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.jwtExpiration,
        });
        let refreshToken = await RefreshToken.createToken(user);

        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          status: user.status,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken
        });
      });
  };

  exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await RefreshToken.findOne({ token: requestToken });
  
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };
