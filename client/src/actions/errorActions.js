import { FETCH_ERRORS, CLEAR_ERRORS } from "./types";

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: FETCH_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
