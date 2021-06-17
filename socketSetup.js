const socketio = require("socket.io");
const jwt = require("jsonwebtoken");

const { sendMessage } = require("./controller/courseController");
const Course = require("./model/courseModel");
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
    if (
      socket.handshake.query &&
      socket.handshake.query.token &&
      socket.handshake.query.courseId
    ) {
      jwt.verify(
        socket.handshake.query.token,
        JWT_SECRET,
        async (err, decoded) => {
          try {
            if (err) throw new AppError("Authentication error", 401);
            socket.decoded = decoded;

            const course = await Course.findById(
              socket.handshake.query.courseId
            );

            if (!course) throw new AppError("No Course found", 400);
            if (
              !course.students.includes(decoded.id) &&
              course.teacher !== decoded.id
            ) {
              throw new AppError("User not part of the course", 401);
            }
            next();
          } catch (err) {
            return err;
          }
        }
      );
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

    socket.on("message", async (data, callback) => {
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
      callback();
    });

    socket.on("typing", (data) => {
      if (data.typing == true) io.in(data.courseId).emit("display", data);
      else io.in(data.courseId).emit("display", data);
    });
  });
};
