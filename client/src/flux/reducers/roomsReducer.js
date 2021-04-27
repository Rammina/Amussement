import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ALL_ROOMS_SUCCESS,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  DELETE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_FAIL,
  UPDATE_ROOM_NAME_SUCCESS,
  EDIT_ROOM_SUCCESS,
  EDIT_ROOM_FAIL,
  EDIT_ROOM_ICON_SUCCESS,
  EDIT_ROOM_ICON_FAIL,
  ROOM_PASSWORD_SUBMIT_SUCCESS,
  ROOM_PASSWORD_SUBMIT_FAIL,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // action.payload.rooms - array of rooms
      return [...action.payload.rooms];

    case GET_ALL_ROOMS_SUCCESS:
      console.log(action.payload);
      return [...action.payload];
    case CREATE_ROOM_SUCCESS:
    case JOIN_ROOM_SUCCESS:
    case ROOM_PASSWORD_SUBMIT_SUCCESS:
      // action.payload is an object that contains a room property (object)
      console.log(action.payload);
      console.log(action.payload.room);
      return [...state, action.payload.room];
    case LEAVE_ROOM_SUCCESS:
      // action.payload.rooms is array of rooms
      return [...action.payload.rooms];
    case UPDATE_ROOM_NAME_SUCCESS:
      // action.payload is object with roomId and name
      return state.map((room) => {
        if (room._id === action.payload.roomId) {
          room.name = action.payload.name;
        }
        return room;
      });
    case EDIT_ROOM_SUCCESS:
      // action.payload is room object
      return state.map((room) => {
        if (room._id === action.payload._id) {
          room = action.payload;
        }
        return room;
      });
    case EDIT_ROOM_ICON_SUCCESS:
      return state.map((room) => {
        if (room._id === action.payload._id) {
          room.image_url = action.payload.image_url;
        }
        return room;
      });
    case DELETE_ROOM_SUCCESS:
      return [...state].filter((room) => room._id !== action.payload.roomId);
    case CREATE_ROOM_FAIL:
    case JOIN_ROOM_FAIL:
    case LEAVE_ROOM_FAIL:
    case EDIT_ROOM_FAIL:
    case ROOM_PASSWORD_SUBMIT_FAIL:
    case EDIT_ROOM_ICON_FAIL:
      return state;
    case LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};
