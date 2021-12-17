import express from "express";
import startup from "./lib/startup";
import api from "./api/index";
import socket from "./websocket/socket";
import middleware from "./middleware/index";
import logger from "./lib/logger";

startup()
  .then(() => {
    const app = express();
    const port = process.env.PORT || 5001;

    middleware(app);
    api(app);

    const server = app.listen(port, () => {
      if (process.send) {
        process.send(`Server running at http://localhost:${port}\n\n`);
      }
    });

    socket(server);
    process.on("message", (message) => {
      console.log(message);
    });
  })
  .catch((error) => {
    logger.error(error);
  });
