import {
  USER_LOADED,
  LOGIN_SUCCESS,
  GET_ALL_ROOMS_SUCCESS,
  GET_ALL_ROOMS_FAIL,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  // GET_ROOM_SUCCESS,
  // GET_ROOM_FAIL,
  // ADD_ROOM_SUCCESS,
  // ADD_ROOM_FAIL,
  // REMOVE_ROOM_SUCCESS,
  // REMOVE_ROOM_FAIL,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return [...action.payload.user.rooms];

    case GET_ALL_ROOMS_SUCCESS:
      console.log(action.payload);
      // note: should probably sort them alphabetically
      return [...action.payload];
    case CREATE_ROOM_SUCCESS:
      console.log(action.payload.room);
      return [...state, action.payload.room];
    // case ADD_ROOM_SUCCESS:
    // case REMOVE_ROOM_SUCCESS:
    //   return [...state];
    // case GET_ALL_ROOMS_FAIL:
    // case ADD_ROOM_FAIL:
    // case REMOVE_ROOM_FAIL:
    //   return state;
    // case CLEAR_ROOMS_LIST:
    //   return [];
    case CREATE_ROOM_FAIL:
      return state;
    default:
      return state;
  }
};
