import {
  ROOM_PASSWORD_REQUIRED,
  ROOM_PASSWORD_SUBMIT_SUCCESS,
  ROOM_PASSWORD_SUBMIT_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = { roomId: null, password_required: null, name: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case ROOM_PASSWORD_REQUIRED:
      // should require a password and provide room's ID and name
      return { ...action.payload };
    case ROOM_PASSWORD_SUBMIT_SUCCESS:
    case LOGOUT_SUCCESS:
      return { roomId: null, password_required: null, name: null };
    case ROOM_PASSWORD_SUBMIT_FAIL:
      return state;
    default:
      return state;
  }
};
