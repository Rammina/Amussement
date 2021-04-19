import { UPDATE_CURRENT_ROOM, CLEAR_CURRENT_ROOM } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_ROOM:
      return { ...action.payload };
    case CLEAR_CURRENT_ROOM:
      return {};
    default:
      return state;
  }
};
