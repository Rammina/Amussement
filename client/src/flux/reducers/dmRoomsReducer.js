import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ALL_ACTIVE_DM_ROOMS_SUCCESS,
  GET_ALL_ACTIVE_DM_ROOMS_FAIL,
  ADD_ACTIVE_DM_ROOM_SUCCESS,
  ADD_ACTIVE_DM_ROOM_FAIL,
  REMOVE_ACTIVE_DM_ROOM_SUCCESS,
  REMOVE_ACTIVE_DM_ROOM_FAIL,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    // case USER_LOADED:
    // case LOGIN_SUCCESS:
    // case REGISTER_SUCCESS:
    //   // note: should sort them by last activity
    //   console.log(action.payload);
    //   return [...action.payload.dmRooms];
    case GET_ALL_ACTIVE_DM_ROOMS_SUCCESS:
      console.log(action.payload);
      return [...action.payload];
    case ADD_ACTIVE_DM_ROOM_SUCCESS:
      console.log(action.payload);
      return action.payload === null ? state : [...action.payload];
    case REMOVE_ACTIVE_DM_ROOM_SUCCESS:
      return [...action.payload.dmRooms];

    case GET_ALL_ACTIVE_DM_ROOMS_FAIL:
    case ADD_ACTIVE_DM_ROOM_FAIL:
    case REMOVE_ACTIVE_DM_ROOM_FAIL:
    // case LOGOUT_F
    //   return state;
    case LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};
