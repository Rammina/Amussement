import axios from "axios";
import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
import { actionShowLoader } from "./loaderActions";

import { compareValues } from "../../helpers";

import { UPDATE_ACTIVE_ROOM, CLEAR_ACTIVE_ROOM } from "./types";

export const updateActiveRoom = () => (dispatch) => {
  history.push("/auth/login");
  dispatch(clearErrors());
  return {
    type: LOGOUT_SUCCESS,
  };
};
