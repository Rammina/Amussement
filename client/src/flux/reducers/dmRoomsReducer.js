import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ALL_ACTIVE_DM_ROOMS_SUCCESS,
  GET_ALL_ACTIVE_DM_ROOMS_FAIL,
  ADD_ACTIVE_DM_ROOM,
  ADD_ACTIVE_DM_ROOM_SUCCESS,
  ADD_ACTIVE_DM_ROOM_FAIL,
  REMOVE_ACTIVE_DM_ROOM,
  REMOVE_ACTIVE_DM_ROOM_SUCCESS,
  REMOVE_ACTIVE_DM_ROOM_FAIL,
  REMOVE_ACTIVE_DM_ROOM_WITH_NAME,
  REMOVE_ACTIVE_DM_ROOM_WITH_NAME_SUCCESS,
  REMOVE_ACTIVE_DM_ROOM_WITH_NAME_FAIL,
  MOVE_DM_ROOM_TO_FRONT,
} from "../actions/types";

const initialState = [];

const sortRoomsByLastActivity = (rooms, order = "ascending") => {
  if (rooms >= 2) {
    rooms.sort(function (a, b) {
      return new Date(b.last_activity) - new Date(a.last_activity);
    });
    if (order === "descending") rooms.reverse();
  }
  return rooms;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // note: should sort them by last activity
      console.log();
      return sortRoomsByLastActivity([...action.payload.dmRooms]);

    case GET_ALL_ACTIVE_DM_ROOMS_SUCCESS:
      console.log(action.payload);
      return [...action.payload];
    case ADD_ACTIVE_DM_ROOM:
    case ADD_ACTIVE_DM_ROOM_SUCCESS:
      for (let room of state) {
        if (room.name === action.payload.name) return state;
      }
      // sort by last activity
      if (action.payload === null) return state;
      return sortRoomsByLastActivity([action.payload, ...state]);
    case REMOVE_ACTIVE_DM_ROOM:
      return [...state].filter((room) => room._id !== action.payload);
    case REMOVE_ACTIVE_DM_ROOM_WITH_NAME:
      return [...state].filter((room) => room.name !== action.payload);
    case REMOVE_ACTIVE_DM_ROOM_SUCCESS:
    case REMOVE_ACTIVE_DM_ROOM_WITH_NAME_SUCCESS:
      return [...action.payload];

    case MOVE_DM_ROOM_TO_FRONT:
      // check if first item has the same name, if true so just return state
      if (state.length > 0 && state[0].name === action.payload) return state;
      // otherwise, move the room to position 0
      const room = [...state].filter((room) => room.name === action.payload);
      const rooms = [...state].filter((room) => room.name !== action.payload);
      // room returns an array with one item
      rooms.unshift(room[0]);
      return rooms;
    case GET_ALL_ACTIVE_DM_ROOMS_FAIL:
    case ADD_ACTIVE_DM_ROOM_FAIL:
    case REMOVE_ACTIVE_DM_ROOM_FAIL:
    case REMOVE_ACTIVE_DM_ROOM_WITH_NAME_FAIL:
      return state;
    case LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
};
