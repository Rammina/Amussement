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
    .post(`/api/rooms/`, { ...formValues, ownerId: userId })
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
      successCb();
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
