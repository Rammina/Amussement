// this should be replaced by a database collection instead
const users = [];

const addUser = ({ socketId, _id, username, room, image_url }) => {
  console.log("the current users before adding are:");
  console.log(users);
  username = username.trim();
  room = room.trim();

  const existingUser = users.find(
    (user) => user.room === room && user.username === username
    // note: implement something like:
    // user => user.room === room && user.name === name && user.id===id
  );
  if (username === "" || room === "") {
    return { error: "Username and room are required." };
  }
  if (existingUser) return { error: "Username and id is taken." };
  console.log("it gets through anyway");
  // console.log(id);
  const userObject = { socketId, _id, username, room, image_url };

  users.push(userObject);
  users.sort(function (a, b) {
    var textA = a.username.toUpperCase();
    var textB = b.username.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  // objArray.sort(function (a, b) {
  //   var textA = a.DepartmentName.toUpperCase();
  //   var textB = b.DepartmentName.toUpperCase();
  //   return textA < textB ? -1 : textA > textB ? 1 : 0;
  // });
  console.log(users);

  return { userObject };
};

const removeUser = (id) => {
  console.log("remove user users list check:");
  console.log(users);
  // note: this cleanup function doesn't even work because the users' socket ID don't get saved
  const index = users.findIndex((user) => user.socketId === id);

  //note: try using ES 6 instead
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.socketId === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
