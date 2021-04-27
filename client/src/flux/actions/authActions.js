import serverRest from "../../apis/serverRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
import { actionShowLoader } from "./loaderActions";
import { reset } from "redux-form";
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
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
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
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        // redirect to another page and clear the errors so it doesn't carry over

        const userId = res.data.user._id;
        history.push(`/users/${userId}/home`);
        dispatch(clearErrors());
      })
      .catch((err) => {
        // this needs an error handler action creator and reducer
        console.log(err);
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: REGISTER_FAIL });
      })
      .finally(() => {
        dispatch(actionShowLoader("registerForm", false));
      });
  };
};

// Login User
export const loginUser = (formValues) => (dispatch) => {
  console.log("logging in the user");
  serverRest
    .post("/api/auth/login", formValues)
    .then((res) => {
      console.log(res.data);
      const userId = res.data.user._id;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(reset("loginForm"));
      // redirect and remove errors
      history.push(`/users/${userId}/home`);
      dispatch(clearErrors());
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
    })
    .finally(() => {
      dispatch(actionShowLoader("loginForm", false));
    });
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch(clearErrors());
  history.push("/auth/login");
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  console.log(localStorage.getItem("token"));

  const token = getState().auth.token;
  // headers
  const config = { headers: { "Content-type": "application/json" } };
  // if token has a value
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
