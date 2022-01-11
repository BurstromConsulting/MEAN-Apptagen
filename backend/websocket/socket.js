const { Server } = require("socket.io");

export default (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
      });
      
};
