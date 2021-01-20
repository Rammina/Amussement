import serverRest from "../../apis/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";

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
    .post(`/api/users/${userId}/friends/add`, formValues)
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
    });
};

export const addFriendWithId = (formValues) => (dispatch, getState) => {
  console.log("adding a friend using friendId");
  const userId = getState().user.info._id || getState().user.info.id;
  // note: try simplifying this to just id instead of using formvalues
  const friendId = formValues.id;

  serverRest
    .post(`/api/users/${userId}/friends/add`, friendId)
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
};

export const removeFriend = (friendId) => (dispatch, getState) => {
  console.log("adding a friend ");
  const userId = getState().user.info._id || getState().user.info.id;

  serverRest
    .post(`/api/users/${userId}/friends/${friendId}/remove`)
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

/*
// Check token & load user
export const loadUser = href => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  console.log(tokenConfig(getState));
  serverRest
    .get("api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      getState().user.info._id || getState().user.info.id;
      // history.push(`/users/${userId}/home`);
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
      // if it's register or home, do not redirect to login
      if (
        !(
          href.includes("/register") ||
          href.includes("/home") ||
          href.includes("/guest") ||
          href.includes("?guest") ||
          href === "http://localhost:3000/"
        )
      ) {
        history.push(`/auth/login`);
      }
    });
};

// Register User
export const registerUser = formValues => {
  return async function(dispatch, getState) {
    serverRest
      .post("api/auth/register", formValues)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push("/auth/login");
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        // this needs an error handler action creator and reducer
        console.log(err);
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };
};

// Login User
export const loginUser = formValues => dispatch => {
  serverRest
    .post("/api/auth/login", formValues)
    .then(res => {
      const userId = res.data.user.id;
      // history needs to push this to the user's id address
      history.push(`/users/${userId}/home`);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      localStorage.setItem("token", res.data.token);
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  history.push("/auth/login");
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  console.log(localStorage.getItem("token"));
  // const token = getState().auth.token || localStorage.getItem("token");
  const token = getState().auth.token;
  // headers
  const config = { headers: { "Content-type": "application/json" } };
  // if token has a value
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
*/
