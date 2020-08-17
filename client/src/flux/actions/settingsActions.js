import serverRest from "../../apis/serverRest";
import history from "../../history";
import { returnErrors } from "./errorActions";
import {
  AUTH_ERROR,
  EDIT_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_FAIL
} from "./types";

// Register User
export const editUserAccount = formValues => {
  return async function(dispatch, getState) {
    const userId = getState().auth.user._id || getState().auth.user.id;
    serverRest
      .post(`/api/users/${userId}/settings/edit-account`, formValues)
      .then(res => {
        console.log(res);
        console.log(res.data);
        // const userId = res.data.user.id;

        history.push(`/users/${userId}/settings`);
        dispatch({ type: EDIT_USER_ACCOUNT_SUCCESS, payload: res.data });
      })
      .catch(err => {
        // this needs an error handler action creator and reducer
        console.log(err);
        // dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDIT_USER_ACCOUNT_FAIL"
        );
        // );
        dispatch({ type: EDIT_USER_ACCOUNT_FAIL });
      });
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
