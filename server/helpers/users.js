const { sortAlphabeticallyByProp } = require("./index");

// this should be replaced by a database collection instead
const users = [];

const addUser = ({ socketId, _id, username, roomId, image_url }) => {
  username = username.trim();
  roomId = roomId.trim();

  const existingUser = users.find(
    (user) => user.roomId == roomId && user.username === username
  );
  if (username === "" || roomId === "") {
    return { error: "Username and room are required." };
  }
  if (existingUser) return { error: "Username and id is taken." };
  const userObject = { socketId, _id, username, roomId, image_url };

  users.push(userObject);

  users.sort(sortAlphabeticallyByProp("username"));

  return { userObject };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.socketId === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.socketId === id);

const getUsersInRoom = (roomId) =>
  users.filter((user) => user.roomId == roomId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
