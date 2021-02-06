import serverRest from "../../apis/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
import { formShowLoader } from "./loaderActions";

import {
  compareValues,
  comparePriorityValues,
  compareKeysInProp,
  objectToArray,
  // cryptography functions
  // encrypt,
  // decrypt,
  // decryptedMsgToString
} from "../../helpers";
import {
  GET_ALL_FRIENDS_SUCCESS,
  GET_ALL_FRIENDS_FAIL,
  GET_FRIEND_SUCCESS,
  GET_FRIEND_FAIL,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAIL,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAIL,
  CLEAR_FRIENDS_LIST,
} from "./types";

export const getAllFriends = (id) => (dispatch, getState) => {
  console.log("getting all friends");
  const userId = id || getState().user.info._id || getState().user.info.id;

  serverRest
    .get(`/api/users/${userId}/friends/`)
    .then((res) => {
      let friends = res.data;
      let sortedData = null;
      console.log(friends);

      // first check if it contains friends
      if (typeof friends !== "undefined" && friends.length > 0) {
        // the array is defined and has at least one element
        let data = null;
        console.log(friends);
        sortedData = friends.sort(compareValues("username"));
        console.log(sortedData);
      }
      dispatch({
        type: GET_ALL_FRIENDS_SUCCESS,
        payload: sortedData || friends,
      });
      dispatch(clearErrors());

      // history.push(`/users/${userId}/home`);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_ALL_FRIENDS_FAIL,
      });
    });
};
// there should be addfriend using ID and username
export const addFriendWithUsername = (formValues) => (dispatch, getState) => {
  console.log("adding a friend ");
  const userId = getState().user.info._id || getState().user.info.id;
  const friendName = formValues.username;

  serverRest
    .post(`/api/users/${userId}/friends`, formValues)
    .then((res) => {
      dispatch({
        type: ADD_FRIEND_SUCCESS,
      });
      dispatch(getAllFriends(userId));
      history.push(`/users/${userId}/friends`);
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADD_FRIEND_FAIL,
      });
    })
    .finally(() => {
      dispatch(formShowLoader("addFriendForm", false));
    });
};

export const addFriendWithId = (friendId) => (dispatch, getState) => {
  console.log("adding a friend using friendId");
  const userId = getState().user.info._id || getState().user.info.id;
  serverRest
    .post(`/api/users/${userId}/friends/${friendId}`, friendId)
    .then((res) => {
      dispatch({
        type: ADD_FRIEND_SUCCESS,
      });
      dispatch(getAllFriends(userId));
      // history.push(`/users/${userId}/friends`);
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ADD_FRIEND_FAIL,
      });
    });
  /*
    .finally(() => {
        dispatch(formShowLoader("addFriendForm", false));
      });
      */
};

export const removeFriend = (friendId) => (dispatch, getState) => {
  console.log("removing a friend ");
  const userId = getState().user.info._id || getState().user.info.id;

  serverRest
    .delete(`/api/users/${userId}/friends/${friendId}`)
    .then((res) => {
      dispatch({
        type: REMOVE_FRIEND_SUCCESS,
      });
      dispatch(getAllFriends(userId));
      history.push(`/users/${userId}/friends`);
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REMOVE_FRIEND_FAIL,
      });
    });
};
// clears the friend list in the frontend
export const clearFriendsList = () => {
  return {
    type: CLEAR_FRIENDS_LIST,
  };
};
