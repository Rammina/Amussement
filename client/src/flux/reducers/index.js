import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
import userReducer from "./userReducer.js";
import friendsReducer from "./friendsReducer.js";
import roomsReducer from "./roomsReducer.js";
import modalSubmitReducer from "./modalSubmitReducer.js";
import loaderReducer from "./loaderReducer.js";
// import authReducer from "./authReducer.js";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  friends: friendsReducer,
  rooms: roomsReducer,
  error: errorReducer,
  modalSubmit: modalSubmitReducer,
  loader: loaderReducer,
});
