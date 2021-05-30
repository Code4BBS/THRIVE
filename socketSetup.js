const socketio = require("socket.io");
const jwt = require("jsonwebtoken");

const { sendMessage } = require("./controller/courseController");
const AppError = require("./utils/appError");
const { JWT_SECRET } = require("./utils/config");

module.exports.socketSetup = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "http://localhost:3001",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, JWT_SECRET, (err, decoded) => {
        if (err) throw new AppError("Authentication error", 401);
        socket.decoded = decoded;
        next();
      });
    } else {
      next(new AppError("Authentication error", 401));
    }
  }).on("connection", (socket) => {
    // Connection now authenticated to receive further events
    //console.log("Socket connected!");
    socket.on("join", async (room) => {
      //console.log(`Joined Course ${room}`);
      socket.join(room);
      io.emit("roomJoined", room); //optional----can be used if required
    });

    socket.on("message", async (data) => {
      //console.log("Message!");
      const { user, message, courseId, createdAt } = data;
      //console.log(data);
      const chatMessage = {
        userId: user.id,
        message,
        courseId,
        createdAt,
      };
      await sendMessage(chatMessage);
      io.in(courseId).emit("newMessage", data); //roomName=courseId
    });

    socket.on("typing", (data) => {
      if (data.typing == true) io.in(data.courseId).emit("display", data);
      else io.in(data.courseId).emit("display", data);
    });
  });
};
