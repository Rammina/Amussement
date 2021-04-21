import {
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  GET_DM_ROOM_SUCCESS,
  GET_DM_ROOM_FAIL,
  UPDATE_CURRENT_ROOM,
  CLEAR_CURRENT_ROOM,
  LOGOUT_SUCCESS,
  EDIT_ROOM_SUCCESS,
} from "../actions/types";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_SUCCESS:
    case GET_DM_ROOM_SUCCESS:
    case UPDATE_CURRENT_ROOM:
    case EDIT_ROOM_SUCCESS:
      return { ...action.payload };
    case CLEAR_CURRENT_ROOM:
    case LOGOUT_SUCCESS:
      return null;
    case GET_ROOM_FAIL:
    case GET_DM_ROOM_FAIL:
    default:
      return state;
  }
};
