const { sortAlphabeticallyByProp } = require("./index");

// this should be replaced by a database collection instead
const users = [];

const addUser = ({ socketId, _id, username, roomId, image_url }) => {
  console.log("the current users before adding are:");
  console.log(users);
  username = username.trim();
  roomId = roomId.trim();

  const existingUser = users.find(
    (user) => user.roomId == roomId && user.username === username
    // note: implement something like:
    // user => user.room === room && user.name === name && user.id===id
  );
  if (username === "" || roomId === "") {
    return { error: "Username and room are required." };
  }
  if (existingUser) return { error: "Username and id is taken." };
  const userObject = { socketId, _id, username, roomId, image_url };

  users.push(userObject);
  console.log("users are:");
  console.log(users);
  users.sort(sortAlphabeticallyByProp("username"));
  console.log("users are:");
  console.log(users);
  return { userObject };
};

const removeUser = (id) => {
  console.log("remove user users list check:");
  console.log(users);
  const index = users.findIndex((user) => user.socketId === id);

  //note: try using ES 6 instead
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.socketId === id);

// note: using strict equality gets really annoying because sometimes
// mongoose gives an object instead of string, and it leads to bugs
// look into this further
const getUsersInRoom = (roomId) =>
  users.filter((user) => user.roomId == roomId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
