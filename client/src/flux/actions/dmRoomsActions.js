import axios from "axios";
import serverRest from "../../apis/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
import { actionShowLoader } from "./loaderActions";

import { compareValues } from "../../helpers";

import {
  GET_ALL_ACTIVE_DM_ROOMS_SUCCESS,
  GET_ALL_ACTIVE_DM_ROOMS_FAIL,
  ADD_ACTIVE_DM_ROOM_SUCCESS,
  ADD_ACTIVE_DM_ROOM_FAIL,
  REMOVE_ACTIVE_DM_ROOM,
  REMOVE_ACTIVE_DM_ROOM_SUCCESS,
  REMOVE_ACTIVE_DM_ROOM_FAIL,
  MOVE_DM_ROOM_TO_FRONT,
} from "./types";

export const getAllDmRooms = (id) => (dispatch, getState) => {
  console.log("getting all rooms");
  //note: temporary solution to prevent frequent get requests (should have a way of checking if it already loaded once)
  if (getState().dmRooms.length > 0) return null;
  const userId = id || getState().user.info._id || getState().user.info.id;

  serverRest
    .get(`/api/users/${userId}/activeDmRooms/`)
    .then((res) => {
      let rooms = res.data;

      dispatch({
        type: GET_ALL_ACTIVE_DM_ROOMS_SUCCESS,
        payload: rooms /*|| sortedData*/,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_ALL_ACTIVE_DM_ROOMS_FAIL,
      });
    });
};

export const addActiveDmRoom = (values, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  // const roomName = values.name;
  console.log(values);

  serverRest
    .post(`/api/users/${userId}/activeDmRooms/`, {
      ...values,
      // senderId: userId,
    })
    .then((res) => {
      dispatch({
        type: ADD_ACTIVE_DM_ROOM_SUCCESS,
        payload: res.data,
      });
      // dispatch(getAllRooms(userId));
      // history.push(`/users/${userId}/rooms`);
      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADD_ACTIVE_DM_ROOM_FAIL,
      });
    })
    .finally(() => {
      // dispatch(actionShowLoader("createRoomModalForm", false));
    });
};

export const removeActiveDmRoom = (roomId, successCb) => (
  dispatch,
  getState
) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(roomId);

  dispatch({
    type: REMOVE_ACTIVE_DM_ROOM,
    payload: roomId,
  });

  // note:might want to change this to roomId in the future
  serverRest
    .patch(`/api/users/${userId}/activeDmRooms/${roomId}/leave`)
    .then((res) => {
      // dispatch({
      //   type: REMOVE_ACTIVE_DM_ROOM_SUCCESS,
      //   payload: res.data,
      // });

      // dispatch(getAllRooms(userId));
      // history.push(`/users/${userId}/rooms`);
      dispatch(clearErrors());
      if (successCb) successCb();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REMOVE_ACTIVE_DM_ROOM_FAIL,
      });
    })
    .finally(() => {
      // dispatch(actionShowLoader("removeRoomModalForm", false));
    });
};

export const moveDmRoomToFront = (roomName, successCb) => (dispatch) => {
  console.log(roomName);

  try {
    dispatch({
      type: MOVE_DM_ROOM_TO_FRONT,
      payload: roomName,
    });
    if (successCb) successCb();
  } catch (err) {
    console.log(err);
  }
};
