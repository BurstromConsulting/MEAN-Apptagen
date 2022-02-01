const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/device.controller");

module.exports = function(app, socketio) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/device/all", controller.getAllDevices);
    
    app.get("/api/device/:id", controller.getDeviceById);

    app.put("/api/device/:id", (req,res) => {
      controller.updateDeviceConfig(req, res, socketio);
    });
    
    app.delete("/api/device/:id", controller.deleteDevice);
    
    app.post("/api/device/", controller.createDevice);
}