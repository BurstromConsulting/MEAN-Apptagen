module.exports = {
  // JWT token timers and the Hash-key for the
    secret: "super-secret-pineapple-key",
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours
  
    /* for test */
    //  jwtExpiration: 60,          // 1 minute
    //  jwtRefreshExpiration: 120  // 2 minutes
  };