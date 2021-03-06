const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app, socketio, upload) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);

  app.get("/api/user/:id", controller.findUserById);

  app.post("/api/user/list", controller.findUsersByList);

  app.put("/api/user/:id/status", (req, res) => {
    controller.updateStatus(req, res, socketio);
  });

  app.put("/api/user/:id/style", (req, res) => {
    controller.updateStyle(req, res, socketio);
  });

  app.post("/api/user/:id/profile", upload.single("file"), (req, res) => {
    const fileName = req.file.filename;
    controller.updateImage(req, res, socketio, {image: fileName});
  });

  app.post("/api/files/profile", (req, res) => {
    const fileName = fileHandler.uploadFile("files/images/profile-picture", req.body.file, req.body.fileType);
  });

  app.get(
    "/api/board/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  
  app.get(
    "/api/board/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/token",
    [authJwt.verifyToken],
    controller.tokenCheck
    );
};