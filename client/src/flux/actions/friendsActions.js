import serverRest from "../../apis/serverRest";

import { returnErrors, clearErrors } from "./errorActions";
import { actionShowLoader } from "./loaderActions";

import { compareValues } from "../../helpers";
import {
  GET_ALL_FRIENDS_SUCCESS,
  GET_ALL_FRIENDS_FAIL,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAIL,
  CLEAR_FRIENDS_LIST,
} from "./types";

export const getAllFriends = (id) => (dispatch, getState) => {
  const userId = id || getState().user.info._id || getState().user.info.id;

  serverRest
    .get(`/api/users/${userId}/friends/`)
    .then((res) => {
      let friends = res.data;
      let sortedData = null;

      // first check if it contains friends
      if (typeof friends !== "undefined" && friends.length > 0) {
        // the array is defined and has at least one element
        let data = null;

        sortedData = friends.sort(compareValues("username"));
      }
      dispatch({
        type: GET_ALL_FRIENDS_SUCCESS,
        payload: sortedData || friends,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_FRIENDS_FAIL,
      });
    });
};
// there should be addfriend using ID and username
export const addFriendWithUsername =
  (formValues, successCb) => (dispatch, getState) => {
    const userId = getState().user.info._id || getState().user.info.id;
    const friendName = formValues.username;

    serverRest
      .post(`/api/users/${userId}/friends`, formValues)
      .then((res) => {
        dispatch({
          type: ADD_FRIEND_SUCCESS,
        });
        dispatch(getAllFriends(userId));
        dispatch(clearErrors());
        if (successCb) successCb();
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: ADD_FRIEND_FAIL,
        });
      })
      .finally(() => {
        dispatch(actionShowLoader("addFriendForm", false));
      });
  };

export const addFriendWithId = (friendId) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  serverRest
    .post(`/api/users/${userId}/friends/${friendId}`, friendId)
    .then((res) => {
      dispatch({
        type: ADD_FRIEND_SUCCESS,
      });
      dispatch(getAllFriends(userId));

      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADD_FRIEND_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("addFriendForm", false));
    });
};

export const removeFriend = (friendId, cb) => (dispatch, getState) => {
  const userId = getState().user.info._id || getState().user.info.id;
  serverRest
    .delete(`/api/users/${userId}/friends/${friendId}`)
    .then((res) => {
      dispatch({
        type: REMOVE_FRIEND_SUCCESS,
      });
      dispatch(getAllFriends(userId));

      dispatch(clearErrors());
      if (cb) cb();
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REMOVE_FRIEND_FAIL,
      });
    })
    .finally(() => {
      dispatch(actionShowLoader("removeFriendModal", false));
    });
};
// clears the friend list in the frontend
export const clearFriendsList = () => {
  return {
    type: CLEAR_FRIENDS_LIST,
  };
};
