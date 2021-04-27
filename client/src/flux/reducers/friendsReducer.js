import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ALL_FRIENDS_SUCCESS,
  GET_ALL_FRIENDS_FAIL,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAIL,
  CLEAR_FRIENDS_LIST,
} from "../actions/types";

// Array of objects(friends)
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(action.payload);
      return [...action.payload.user.friends];

    case GET_ALL_FRIENDS_SUCCESS:
      console.log(action.payload);
      // note: should probably sort them alphabetically
      return [...action.payload];
    case ADD_FRIEND_SUCCESS:
    case REMOVE_FRIEND_SUCCESS:
      return [...state];
    case GET_ALL_FRIENDS_FAIL:
    case ADD_FRIEND_FAIL:
    case REMOVE_FRIEND_FAIL:
      return state;
    case CLEAR_FRIENDS_LIST:
    case LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};
