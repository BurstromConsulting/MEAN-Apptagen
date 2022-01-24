const Server = require("socket.io").Server;
module.exports = function(app) {
        
    const io = new Server(app, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
          allowedHeaders: [],
          credentials: true
        }
      });

    io.on("connection", (socket) => {
        console.log("Client Connected:")
        // socket.on("status/update", (data) => {
        //     broadcastUpdate(io, data);
        // })
    });
    io.custom = {};
    io.custom.broadcastUpdate = (status) => { io.emit("status/broadcast", status) }
    return io;
};

// function broadcastUpdate(socket, status){
//     socket.emit("status/broadcast", status);
//}