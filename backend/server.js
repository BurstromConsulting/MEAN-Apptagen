const express = require("express");
const cors = require("cors");

const app = express();


var corsOption = {
    origin: ["http://localhost", "http://localhost:4200", "http://192.168.1.42",]
};

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;
const Availability = db.availability;

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("files"));

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

const socketio = require('./app/websocket/serversocket')(server);
require('./app/routes/user.routes')(app, socketio);
require('./app/routes/device.routes')(app, socketio);
require('./app/routes/config.routes')(app, socketio);
require('./app/routes/style.routes')(app, socketio);
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
                        //console.log("Ah, shiet, ett error", err);
                    }
                    //console.log(`added '${s.status}' to availability collection`);
                });
            });
        }
    });
}