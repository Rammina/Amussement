import axios from "axios";
import serverRest from "../../apis/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
import { actionShowLoader } from "./loaderActions";

import { compareValues } from "../../helpers";

import {
  GET_ALL_ROOMS_SUCCESS,
  GET_ALL_ROOMS_FAIL,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAIL,
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_FAIL,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
} from "./types";

export const getAllRooms = (id) => (dispatch, getState) => {
  console.log("getting all rooms");
  const userId = id || getState().user.info._id || getState().user.info.id;

  serverRest
    .get(`/api/rooms/`)
    .then((res) => {
      let rooms = res.data;
      let sortedData = null;
      console.log(rooms);

      // note: think about whether sorting rooms should be up to the user
      // first check if it contains rooms
      if (typeof rooms !== "undefined" && rooms.length > 0) {
        // the array is defined and has at least one element
        let data = null;
        console.log(rooms);
        sortedData = rooms.sort(compareValues("name"));
        console.log(sortedData);
      }

      dispatch({
        type: GET_ALL_ROOMS_SUCCESS,
        payload: sortedData || rooms,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_ALL_ROOMS_FAIL,
      });
    });
};

export const createRoom = (formValues, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  const roomName = formValues.name;
  console.log(formValues);

  serverRest
    .post(`/api/rooms/`, { ...formValues, senderId: userId })
    .then((res) => {
      dispatch({
        type: CREATE_ROOM_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
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
        type: CREATE_ROOM_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("createRoomModalForm", false));
    });
};

export const joinRoom = (formValues, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  const roomName = formValues.name;
  console.log(formValues);

  // note:might want to change this to roomId in the future
  serverRest
    .patch(`/api/rooms/${roomName}/join`, { ...formValues, userId })
    .then((res) => {
      dispatch({
        type: JOIN_ROOM_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
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
        type: JOIN_ROOM_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("joinRoomModalForm", false));
    });
};

export const leaveRoom = (roomId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(roomId);

  // note:might want to change this to roomId in the future
  serverRest
    .patch(`/api/rooms/${roomId}/leave`, { roomId, userId })
    .then((res) => {
      dispatch({
        type: LEAVE_ROOM_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
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
        type: LEAVE_ROOM_FAIL,
      });
    })
    .finally(() => {
      // dispatch(actionShowLoader("leaveRoomModalForm", false));
    });
};

export const deleteRoom = (roomId, successCb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  console.log(roomId);
  /*
  await axios
    .delete(
      `http://localhost:5000/api/users/${userId}/settings/delete-account`,
      // this format is necessary for axios, needs to be in {data: }
      { data: formValues }
    )
*/
  axios
    .delete(`http://localhost:5000/api/rooms/${roomId}`, {
      data: { roomId, userId },
    })
    .then((res) => {
      dispatch({
        type: DELETE_ROOM_SUCCESS,
        payload: {
          /*note: think about should be returned from the server as payload*/
          ...res.data,
        },
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
        type: DELETE_ROOM_FAIL,
      });
    })
    .finally(() => {
      // dispatch(actionShowLoader("leaveRoomModalForm", false));
    });
};
