import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ALL_ROOMS_SUCCESS,
  GET_ALL_ROOMS_FAIL,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  // GET_ROOM_SUCCESS,
  // GET_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_FAIL,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(action.payload);
      return [...action.payload.rooms];

    case GET_ALL_ROOMS_SUCCESS:
      console.log(action.payload);
      // note: should probably sort them alphabetically
      return [...action.payload];
    case CREATE_ROOM_SUCCESS:
    case JOIN_ROOM_SUCCESS:
      console.log(action.payload.room);
      return [...state, action.payload.room];
    case LEAVE_ROOM_SUCCESS:
      return [...action.payload.rooms];
    case DELETE_ROOM_SUCCESS:
      return [...state].filter((room) => room._id !== action.payload.roomId);
    // case REMOVE_ROOM_SUCCESS:
    //   return [...state];
    // case GET_ALL_ROOMS_FAIL:

    // case REMOVE_ROOM_FAIL:
    //   return state;
    // case CLEAR_ROOMS_LIST:
    //   return [];
    case CREATE_ROOM_FAIL:
    case JOIN_ROOM_FAIL:
    case LEAVE_ROOM_FAIL:
      return state;
    case LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};
