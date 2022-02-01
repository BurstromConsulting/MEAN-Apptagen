const Server = require("socket.io").Server;
module.exports = function (app) {

  const io = new Server(app, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: [],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    //console.log("Client Connected:")
    socket.on("register", (uuid) => {
      io.custom.uuidToSocket.set(uuid, { socket: socket, uuid: uuid });
      //console.log(io.custom.uuidToSocket);

    })
    socket.on("rooms/change/config", (data) => {
      const newRoom = "config/" + data.newId;
      if (!!data.newId) {
        socket.join(newRoom);
        if (!io.custom.configRooms.has(newRoom)) {
          io.custom.configRooms.set(newRoom, { clients: [] });
        }
        clientList = io.custom.configRooms.get(newRoom).clients;
        console.log("client ", data.uuid, "joined room ", newRoom);
        
        if(clientList.filter(clientUuid => clientUuid === data.uuid).length === 0){
          clientList.push(data.uuid);
        }
      }
      if (!!data.oldId && data.oldId !== data.newId) {
        socket.leave("config/" + data.oldId);
        console.log("client ", data.uuid, "left room ", "config/" + data.oldId);
      }
    })
    // socket.on("status/update", (data) => {
    //     broadcastUpdate(io, data);
    // })
  });
  io.custom = {};
  io.custom.configRooms = new Map();
  io.custom.uuidToSocket = new Map();
  io.custom.broadcastStatus = (status) => { io.emit("status/broadcast", status) }
  io.custom.configUpdate = (uuid, config) => {
    if (io.custom.uuidToSocket.has(uuid)) {
      io.custom.uuidToSocket.get(uuid).socket.emit("config/update", config);
    }
  }
  io.custom.broadcastConfig = (config) => {
    const roomId = "config/" + `${config._id.valueOf()}`;
    console.log("BroadcastConfig ", io.custom.configRooms, roomId);
    // console.log(
    //   `${config._id.valueOf()}`,
    //   io.custom.configRooms.has("config/"+`${config._id.valueOf()}`)
    // )
    // console.log(roomId,
    //   io.custom.configRooms);
    if (io.custom.configRooms.has(roomId)) {
      console.log("I Exist ", config);
      io.to(roomId).emit("config/update", config);
    }
  }


  return io;
};
// function broadcastUpdate(socket, status){
//     socket.emit("status/broadcast", status);
//}