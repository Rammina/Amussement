import { returnErrors, clearErrors } from "./errorActions";

import { UPDATE_CURRENT_ROOM, CLEAR_CURRENT_ROOM } from "./types";

export const updateCurrentRoom = (room) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_ROOM, payload: room });
  dispatch(clearErrors());
};

export const clearCurrentRoom = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_ROOM });
  dispatch(clearErrors());
};
