require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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
const allowedOrigins = ["http://http://localhost:3000/"];
app.use(cors());
app.use(router);
app.use(logger("dev"));

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

//note: this might change
app.use(express.static(path.join(__dirname, "public")));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// next(createError(404));
// });

// triggers when the user connects
io.on("connect", (socket) => {
  // listen for any user join sent from the client side
  socket.on("join", ({ user, room, messageRetrievalCount = 0 }, callback) => {
    //const {username}

    const { error, userObject } = addUser({
      ...user,
      socketId: socket.id,
      room,
    });
    console.log("the current users after adding are:");
    console.log(getUsersInRoom(room));

    if (error) return callback(error);

    // have the user join the room
    socket.join(userObject.room);
    // this helper function returns messages from a room
    retrieveMessagesFromDB(userObject.room, messageRetrievalCount)
      .then((messages) => {
        // console.log(messages);
        // emit only works for the sender
        socket.emit("load messages", messages.reverse());
      })
      .then(() => {
        // note: user joining notifications used to be here but removed because it's obnoxious
        io.to(userObject.room).emit("roomData", {
          room: userObject.room,
          users: getUsersInRoom(userObject.room),
        });
      });

    callback();
  });

  // listens to an event called "sendMessage" and fires the callback function
  socket.on("sendMessage", ({ message, user, room }, callback) => {
    console.log("sendMessage event triggered");
    console.log(message);
    console.log(user);
    console.log(`the name of the room is ${room}`);
    let messageAttributes = {
      text: message,
      username: user.username,
      user: user._id || user.id,
      image_url: user.image_url,
      room,
    };
    console.log(messageAttributes);

    const emitMessageCb = (message) => {
      console.log("successfully stored the message in the database");
      console.log("159");
      console.log(message);
      // Sends the message to everyone
      io.to(room).emit("message", { ...message._doc, user });
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
      console.log(e);
    }
  });

  socket.on("deleteMessage", (id, room, callback) => {
    try {
      deleteMessageFromDB(id).then(() => {
        console.log("successfully Deleted the message in the database");
        console.log(room);
        io.to(room).emit("deletedMessage", id);
      });
      // do something after the message is sent to the backend frontend
      callback();
    } catch (e) {
      // should have proper error handling, state that it failed to store the message
      console.log(e);
    }
  });

  socket.on("editMessage", (id, text, room, callback) => {
    try {
      editMessageOnDB(id, text).then(() => {
        console.log("successfully updated the message in the database");
        console.log(room);
        io.to(room).emit("editedMessage", id, text);
      });
      // do something after the message is sent to the backend frontend
      callback();
    } catch (e) {
      // should have proper error handling, state that it failed to store the message
      console.log(e);
    }
  });

  //note: retrieve more messages (should only work on the client side)
  socket.on("load more messages", (room, messageRetrievalCount, callback) => {
    console.log(room);
    console.log(messageRetrievalCount);
    console.log(callback);
    // this helper function returns messages from a room
    retrieveMessagesFromDB(room, messageRetrievalCount).then((messages) => {
      console.log(messages.length);
      // io.emit("load previous messages", messages.reverse());
      callback(messages.reverse());
    });
  });

  // listen to a disconnected event and send a message that the user has disconnected
  socket.on("disconnect", () => {
    console.log("disconnect message:" + socket.id);
    console.log(getUsersInRoom());
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
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

/*

// welcome message upon joining room, sent to all clients
socket.emit("message", {
  user: { name: "RoroBot", room: user.room },
  text: `${user.name}, welcome to room ${user.room}.`,
  createdAt: new Date(),
});
// sends an event to all users in the said room, except the specified user
socket.broadcast.to(user.room).emit("message", {
  user: { name: "RoroBot", room: user.room },
  text: `${user.name} has joined!`,
  createdAt: new Date(),
});

io.to(user.room).emit("message", {
  user: { name: "RoroBot", room: user.room },
  text: `${user.name} has left.`,
  createdAt: new Date(),
});
*/
