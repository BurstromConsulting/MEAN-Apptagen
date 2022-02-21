const { authJwt } = require("../middleware");
const controller = require("../controllers/style.controller");

module.exports = function (app, socketio, upload) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/style/all", controller.findStyles);

  app.get("/api/style/:id", controller.findStyleById);

  app.post("/api/style/create", controller.createStyle);

  app.put("/api/style/:id/update", controller.updateStyle);

  app.post("/api/style/background", upload.single("file"), (req, res) => {
    const fileName = req.file.filename;
    // console.log(req.body.name);
    controller.saveStyle(req, res, {background: fileName, name: req.body.name, fontcolor: "black"})
  });

};