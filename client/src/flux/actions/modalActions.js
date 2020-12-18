import { MODAL_STATUS_RESET } from "./types";

// reset modal status
export const modalStatusReset = () => {
  return {
    type: MODAL_STATUS_RESET,
  };
};
