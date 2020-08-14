import serverRest from "../apis/serverRest";
import history from "../history";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  console.log(tokenConfig(getState));
  serverRest
    .get("api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const registerUser = (formValues) => {
  return async function (dispatch, getState) {
    serverRest
      .post("api/auth/register", formValues)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        history.push("/auth/login");
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      })
      .catch((e) => {
        // this needs an error handler action creator and reducer
        console.log(e);
        // console.log(e.response);
        // console.log(e.response.data);
        // console.log(e.response.data.errors);
        // console.log(e.response.data.errors[0].msg);
        dispatch({ type: REGISTER_FAIL });
      });
  };
};

// Login User
export const loginUser = (formValues) => (dispatch) => {
  serverRest
    .post("/api/auth/login", formValues)
    .then((res) => {
      const userId = res.data.user.id;
      // history needs to push this to the user's id address
      history.push(`/users/${userId}/home`);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  // headers
  const config = { headers: { "Content-type": "application/json" } };
  // if token has a value
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
