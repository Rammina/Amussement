import {
  GET_ALL_FRIENDS_SUCCESS,
  GET_ALL_FRIENDS_FAIL,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAIL,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAIL
} from "../actions/types";

// Array of objects(friends)
const initialState = [];

// const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
