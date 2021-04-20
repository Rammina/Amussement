import {
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  UPDATE_CURRENT_ROOM,
  CLEAR_CURRENT_ROOM,
} from "../actions/types";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOM_SUCCESS:
    case UPDATE_CURRENT_ROOM:
      return { ...action.payload };
    case CLEAR_CURRENT_ROOM:
      return null;
    case GET_ROOM_FAIL:
    default:
      return state;
  }
};
