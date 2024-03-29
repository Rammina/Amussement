require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");

const createError = require("http-errors");
const logger = require("morgan");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

// helper functions
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./helpers/users");
const {
  storeMessageToDb,
  retrieveMessagesFromDB,
  deleteMessageFromDB,
  editMessageOnDB,
} = require("./helpers/messages");

const app = express();

// routes
const router = require("./router");
const authRoute = require("./routes/api/auth");
const usersRoute = require("./routes/api/users");
const roomsRoute = require("./routes/api/rooms");

// Set up mongoose connection
const mongoose = require("mongoose");

const mongoPass = process.env.MONGOPASS;
const dbName = process.env.MONGODBNAME;
const dev_db_url = `mongodb://AltinaSchwarzer:${mongoPass}@cluster0-shard-00-00.wxhge.mongodb.net:27017,cluster0-shard-00-01.wxhge.mongodb.net:27017,cluster0-shard-00-02.wxhge.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-5i6e4z-shard-0&authSource=admin&retryWrites=true&w=majority`;

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// import the mongoose message model
const Message = require("./models/message");

const server = http.createServer(app);
const io = socketio(server);

// Cors stuff
const allowedOrigins = ["https://https://localhost:3000/"];
app.use(cors());
app.use(router);
app.use(logger("dev"));

// add the routes that have to do with uploading images ahead of time to increase the limit of the date the size
// also to allow for urlencoded extended to be true
app.use(
  "/api/users/:id/settings/upload-avatar",
  express.json({ limit: "50mb" })
);
app.use(
  "/api/users/:id/settings/upload-avatar",
  express.urlencoded({ extended: "true" })
);
app.use("/api/rooms/:id/upload_icon", express.json({ limit: "50mb" }));
app.use("/api/rooms/:id/upload_icon", express.urlencoded({ extended: "true" }));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, "public")));

// Connect flash
app.use(flash());

// Socket.io connection and events handling
// triggers when the user connects
io.on("connect", (socket) => {
  // listen for any user join sent from the client side
  socket.on(
    "join",
    ({ user, roomId, messageRetrievalCount = 0, roomType }, callback) => {
      const { error, userObject } = addUser({
        ...user,
        socketId: socket.id,
        roomId,
      });
      if (error) return callback(error);

      // have the user join the room
      socket.join(userObject.roomId);

      // this helper function returns messages from a public room using ID (temporarily name for DM )
      retrieveMessagesFromDB(userObject.roomId, messageRetrievalCount)
        .then((messages) => {
          socket.emit("load messages", messages.reverse());
        })
        .then(() => {
          io.to(userObject.roomId).emit("roomData", {
            roomId: userObject.roomId,
            users: getUsersInRoom(userObject.roomId),
          });
        });

      callback();
    }
  );

  // listens to an event called "sendMessage" and fires the callback function
  socket.on("sendMessage", ({ message, user, roomId }, callback) => {
    let messageAttributes = {
      text: message,
      username: user.username,
      user: user._id || user.id,
      image_url: user.image_url,
      room: roomId,
    };

    const emitMessageCb = (message) => {
      // Sends the message to everyone
      // note: maybe there is a better way to handle this instead of message._doc
      io.to(roomId).emit("message", { ...message._doc, user });
      socket.emit("scrollToBottomAfterSending");
    };
    try {
      storeMessageToDb(messageAttributes).then((message) => {
        emitMessageCb(message);
      });
      // do something after the message is sent to the backend frontend
      callback();
    } catch (e) {
      // should have proper error handling, state that it failed to store the message
      console.error(e);
    }
  });

  socket.on("deleteMessage", (id, roomId) => {
    try {
      deleteMessageFromDB(id).then(() => {
        io.to(roomId).emit("deletedMessage", id);
      });
    } catch (e) {
      // should have proper error handling, state that it failed to store the message
      console.error(e);
    }
  });

  socket.on("editMessage", (id, text, roomId) => {
    try {
      editMessageOnDB(id, text).then(() => {
        io.to(roomId).emit("editedMessage", id, text);
      });
    } catch (e) {
      // should have proper error handling, state that it failed to store the message
      console.error(e);
    }
  });

  socket.on("load more messages", (roomId, messageRetrievalCount, cb) => {
    try {
      // this helper function returns messages from a room
      retrieveMessagesFromDB(roomId, messageRetrievalCount).then((messages) => {
        cb(messages.reverse());
      });
    } catch (e) {
      // should have proper error handling, state that it failed to store the message
      console.error(e);
    }
  });

  // listen to a disconnected event and send a message that the user has disconnected
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.roomId).emit("roomData", {
        roomId: user.roomId,
        users: getUsersInRoom(user.roomId),
      });
    }
  });
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
