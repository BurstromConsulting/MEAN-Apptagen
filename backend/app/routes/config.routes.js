const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/config.controller");

module.exports = function(app, socketio) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/config/all", controller.findAllConfig);
    
    app.get("/api/config/:id", controller.findConfigById);

    app.put("/api/config/:id", (req, res) => {
      controller.updateConfig(req, res, socketio);
    });
    
    app.delete("/api/config/:id", controller.deleteConfig);
    
    app.post("/api/config/", controller.createConfig);
}