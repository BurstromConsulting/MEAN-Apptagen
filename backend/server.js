const express = require("express");
const cors = require("cors");
const multer = require('multer');
// creates the Crypto variable to create a unique name for our file in the database
const crypto = require('crypto');

//Sets up the storage values for when we call our file.save-functions.
var storage = multer.diskStorage({
    //Assigns the destionation folder where we store the new file.
    destination: function(req, file, callback) {
        let location = req.url.split("/").pop();
        callback(null, './files/images/'+location);    
     }, 
     //Assigns the file name to the uploaded file
     filename: function (req, file, callback) { 
        const hashName = crypto.randomBytes(20).toString('hex');
        const fileName = hashName+'.'+file.originalname.split(".").pop();
        callback(null , fileName);   
     }
});
//Sets the storage value to upload of Multer and then the filesize limit to any fileupload
const upload = multer({
    storage: storage,
    limits : {fileSize : 10000000}
});

const app = express();


var corsOption = {
    origin: ["http://localhost", "http://localhost:4200", "http://192.168.1.42",]
};

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;
const Availability = db.availability;

app.use(cors(corsOption)); // Sets the Cross Origin Requests up for our app using the CorsOption
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: true}));
app.use(express.static("files")); // Makes our files available through a URL request

// routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Apptagen application."});
});


require('./app/routes/auth.routes')(app);
require('./app/routes/status.routes')(app);
// set port, listen for requests

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

//Initiates the Socket.Io functionality and passes it to the routes that will need it. alongside the Multer upload functionality, for those that will need to upload files.
const socketio = require('./app/websocket/serversocket')(server);
require('./app/routes/user.routes')(app, socketio, upload);
require('./app/routes/device.routes')(app, socketio);
require('./app/routes/config.routes')(app, socketio);
require('./app/routes/style.routes')(app, socketio, upload);
//Connects to our MongoDB database at our specified addess
db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
        });

        // runs function on Database startup and appends Status and Roles to our Collection.
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            db.ROLES.forEach(r => {
                new Role({
                    name: r
                }).save(err => {
                    if (err){
                        //console.log("error", err);
                    }
                    //console.log(`added '${r}' to roles collection`);
    
                });
            });
            
        }
    
    });
    Availability.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            db.STATUS.forEach(s => {
                new Availability({
                    status: s.status,
                    color: s.color
                }).save(err => {
                    if (err){
                        console.log(err)
                    }
                });
            });
        }
    });
}