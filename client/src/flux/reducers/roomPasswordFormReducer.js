import {
  ROOM_PASSWORD_REQUIRED,
  ROOM_PASSWORD_SUBMIT_SUCCESS,
  ROOM_PASSWORD_SUBMIT_FAIL,
} from "../actions/types";

const initialState = { roomId: null, password_required: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case ROOM_PASSWORD_REQUIRED:
      return { roomId: action.payload.roomId, password_required: true };
    case ROOM_PASSWORD_SUBMIT_SUCCESS:
      return { roomId: null, password_required: null };
    case ROOM_PASSWORD_SUBMIT_FAIL:
      return state;
    default:
      return state;
  }
};
