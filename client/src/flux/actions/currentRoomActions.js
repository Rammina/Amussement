import serverRest from "../../apis/serverRest";

import { returnErrors, clearErrors } from "./errorActions";

import {
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  GET_DM_ROOM_SUCCESS,
  GET_DM_ROOM_FAIL,
  UPDATE_CURRENT_ROOM,
  CLEAR_CURRENT_ROOM,
} from "./types";

export const getRoom = (roomId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(userId);
  serverRest
    .get(`/api/rooms/${roomId}?userId=${userId}`)
    .then((res) => {
      dispatch({
        type: GET_ROOM_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err.response.data);
      //note: dispatch an action Creator that indicates that the user is not a member of the room
      // and should redirect to home
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_ROOM_FAIL,
      });
    })
    .finally(() => {});
};

export const getDmRoom = (roomName, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(userId);
  serverRest
    .get(`/api/rooms/dmRooms/${roomName}?userId=${userId}`)
    .then((res) => {
      dispatch({
        type: GET_DM_ROOM_SUCCESS,
        payload: res.data,
      });
      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err.response.data);
      //note: dispatch an action Creator that indicates that the user is not allowed to dm that person
      // and should redirect to home?
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_DM_ROOM_FAIL,
      });
    })
    .finally(() => {});
};

export const updateCurrentRoom = (room) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_ROOM, payload: room });
  dispatch(clearErrors());
};

export const clearCurrentRoom = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_ROOM });
  dispatch(clearErrors());
};
