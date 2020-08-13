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
  getUsersInRoom
} = require("./helpers/users");

// routes
const router = require("./router");
const authRoute = require("./routes/api/auth");
// const usersRoute = require("./routes/api/users");

const app = express();
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

const server = http.createServer(app);
const io = socketio(server);

// Cors stuff
const allowedOrigins = ["http://http://localhost:3000/"];
app.use(cors());
app.use(router);
app.use(logger("dev"));

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

io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "RoroBot",
      text: `${user.name}, welcome to room ${user.room}.`
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "RoroBot",
      text: `${user.name} has joined!`
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "RoroBot",
        text: `${user.name} has left.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

app.use("api/auth", authRoute);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
