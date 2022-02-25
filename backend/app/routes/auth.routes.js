const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controllers");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Authentication for UserSignup, with Middlewares checking validity

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  
    // Authentication call for user sign-in
  app.post("/api/auth/signin", controller.signin);
  
  // Refreshes user's token  if they remain active on the website so that they stay logged-in.
  app.post("/api/auth/refreshtoken", controller.refreshToken);
};