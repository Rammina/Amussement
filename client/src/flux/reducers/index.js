import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
// import authReducer from "./authReducer.js";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  error: errorReducer
});
