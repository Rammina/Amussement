import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";
import history from "../../history";
import { returnErrors } from "./errorActions";
import {
  AUTH_ERROR,
  EDIT_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_FAIL,
  EDIT_USER_AVATAR_SUCCESS,
  EDIT_USER_AVATAR_FAIL,
  REMOVE_USER_AVATAR_SUCCESS,
  REMOVE_USER_AVATAR_FAIL,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAIL
} from "./types";

// edit account
export const editUserAccount = formValues => {
  return async function(dispatch, getState) {
    const userId = getState().auth.user._id || getState().auth.user.id;
    await serverRest
      .post(`/api/users/${userId}/settings/edit-account`, formValues)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push(`/users/${userId}/settings`);
        dispatch({ type: EDIT_USER_ACCOUNT_SUCCESS, payload: res.data });
      })
      .catch(err => {
        // this needs an error handler action creator and reducer
        console.log(err);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "EDIT_USER_ACCOUNT_FAIL"
          )
        );
        dispatch({ type: EDIT_USER_ACCOUNT_FAIL });
      });
  };
};

// change password
export const changeUserPassword = formValues => {
  return async function(dispatch, getState) {
    const userId = getState().auth.user._id || getState().auth.user.id;
    await serverRest
      .post(`/api/users/${userId}/settings/change-password`, formValues)
      .then(res => {
        console.log(res);
        console.log(res.data);
        history.push(`/users/${userId}/settings`);
        dispatch({ type: CHANGE_USER_PASSWORD_SUCCESS, payload: res.data });
      })
      .catch(err => {
        // this needs an error handler action creator and reducer
        console.log(err);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "CHANGE_USER_PASSWORD_FAIL"
          )
        );
        dispatch({ type: CHANGE_USER_PASSWORD_FAIL });
      });
  };
};

export const editUserAvatar = (base64EncodedImage, id) => {
  return async function(dispatch, getState) {
    const userId = id || getState().auth.user._id || getState().auth.user.id;
    console.log("hello");
    try {
      await cloudinaryRest
        .post(
          `/api/users/${userId}/settings/upload-avatar`,
          JSON.stringify({ data: base64EncodedImage })
        )
        .then(res => {
          console.log(res.data);
          dispatch({ type: EDIT_USER_AVATAR_SUCCESS, payload: res.data });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDIT_USER_AVATAR_FAIL"
        )
      );
      dispatch({ type: EDIT_USER_AVATAR_FAIL });
    }
  };
};

export const removeUserAvatar = id => {
  return async function(dispatch, getState) {
    const userId = id || getState().auth.user._id || getState().auth.user.id;
    try {
      await cloudinaryRest
        .post(`/api/users/${userId}/settings/remove-avatar`, {
          message: "remove avatar"
        })
        .then(res => {
          console.log(res.data);
          dispatch({ type: REMOVE_USER_AVATAR_SUCCESS, payload: res.data });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "REMOVE_USER_AVATAR_FAIL"
        )
      );
      dispatch({ type: REMOVE_USER_AVATAR_FAIL });
    }
  };
};
/*
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
