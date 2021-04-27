import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
import userReducer from "./userReducer.js";
import friendsReducer from "./friendsReducer.js";
import roomsReducer from "./roomsReducer.js";
import currentRoomReducer from "./currentRoomReducer.js";
import roomPasswordFormReducer from "./roomPasswordFormReducer.js";
import dmRoomsReducer from "./dmRoomsReducer.js";
import modalSubmitReducer from "./modalSubmitReducer.js";
import loaderReducer from "./loaderReducer.js";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  friends: friendsReducer,
  rooms: roomsReducer,
  currentRoom: currentRoomReducer,
  roomPasswordForm: roomPasswordFormReducer,
  dmRooms: dmRoomsReducer,
  error: errorReducer,
  modalSubmit: modalSubmitReducer,
  loader: loaderReducer,
});
