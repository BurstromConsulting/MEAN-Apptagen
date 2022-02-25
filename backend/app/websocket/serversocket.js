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

  // Sets up the Serverside implementation for Socket.io to handle changes in our database when various types of events occur or calls are emitted

  io.on("connection", (socket) => {
    socket.on("register", (uuid) => {
      io.custom.uuidToSocket.set(uuid, { socket: socket, uuid: uuid });

    })
    socket.on("rooms/change/config", (data) => {
      const newRoom = "config/" + data.newId;
      if (!!data.newId) {
        socket.join(newRoom);
        //Device Joins the Room that matches the ConfigID, then checks if that room is on the list of ConfigRooms
        if (!io.custom.configRooms.has(newRoom)) {
          io.custom.configRooms.set(newRoom, { clients: [] });
        }
        clientList = io.custom.configRooms.get(newRoom).clients;
        // console.log("client ", data.uuid, "joined room ", newRoom);
        
        if(clientList.filter(clientUuid => clientUuid === data.uuid).length === 0){
          clientList.push(data.uuid);
        }
      }
      //Device Joins the Room that matches the ConfigID, if its not Identical to the previous room ID
      if (!!data.oldId && data.oldId !== data.newId) {
        socket.leave("config/" + data.oldId);
        // console.log("client ", data.uuid, "left room ", "config/" + data.oldId);
      }
    })
    socket.on("status/update", (data) => {
        broadcastUpdate(io, data);
    })
    //TO-DO: Add Socket.on Event for Style updates
  });
  // Creates new mappings under a "Custom" value where we define these functions and attributes
  io.custom = {};
  io.custom.configRooms = new Map();
  io.custom.uuidToSocket = new Map();
  io.custom.broadcastStatus = (status) => { io.emit("status/broadcast", status) }
  io.custom.configUpdate = (uuid, config) => {
    if (io.custom.uuidToSocket.has(uuid)) {
      io.custom.uuidToSocket.get(uuid).socket.emit("config/update", config);
    }
  }
  //Broadcasts a change to the Config, then checks if the Config has been assigned a Room.
  io.custom.broadcastConfig = (config) => {
    const roomId = "config/" + `${config._id.valueOf()}`;
    
    if (io.custom.configRooms.has(roomId)) {
      io.to(roomId).emit("config/update", config);
    }
  }


  return io;
};
function broadcastUpdate(socket, status){
    socket.emit("status/broadcast", status);
}