// this should be replaced by a database collection instead
const users = [];

const addUser = ({ id, name, room, image_url }) => {
  console.log(users);
  name = name.trim();
  room = room.trim();

  const existingUser = users.find(
    user => user.room === room && user.name === name
    // note: implement something like:
    // user => user.room === room && user.name === name && user.id===id
  );
  // console.log(user);
  /*
  console.log(name);
  console.log(trimmedname);
  console.log("hello2");
  console.log(room);
  console.log(trimmedroom);*/
  // note: refactor this to check if it's an empty string
  if (name === "" || room === "") {
    return { error: "Username and room are required." };
  }
  if (existingUser) return { error: "Username and id is taken." };
  console.log("it gets through anyway");
  const user = { id, name, room, image_url };

  users.push(user);
  console.log(users);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  //note: try using ES 6 instead
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
