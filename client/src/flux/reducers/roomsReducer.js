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
  UPDATE_ROOM_NAME_SUCCESS,
  UPDATE_ROOM_NAME_FAIL,
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
    case UPDATE_ROOM_NAME_SUCCESS:
      // note: this should update that specific room in the list of rooms without displacing it
      // try at finding it using ID and then changing its value using the action.payload
      return state.map((room) => {
        if (room._id === action.payload.roomId) {
          room.name = action.payload.name;
        }
        return room;
      });
    // return ;
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
