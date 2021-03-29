// AUTHORIZATION/AUTHENTICATION/ACCOUNTS
export const REGISTER_FAIL = "REGISTER_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const EDIT_USER_ACCOUNT_SUCCESS = "EDIT_USER_ACCOUNT_SUCCESS";
export const EDIT_USER_ACCOUNT_FAIL = "EDIT_USER_ACCOUNT_FAIL";
export const CHANGE_USER_PASSWORD_SUCCESS = "CHANGE_USER_PASSWORD_SUCCESS";
export const CHANGE_USER_PASSWORD_FAIL = "CHANGE_USER_PASSWORD_FAIL";
export const EDIT_USER_AVATAR_SUCCESS = "EDIT_USER_AVATAR_SUCCESS";
export const EDIT_USER_AVATAR_FAIL = "EDIT_USER_AVATAR_FAIL";
export const REMOVE_USER_AVATAR_SUCCESS = "REMOVE_USER_AVATAR_SUCCESS";
export const REMOVE_USER_AVATAR_FAIL = "REMOVE_USER_AVATAR_FAIL";
export const DISABLE_USER_ACCOUNT_SUCCESS = "DISABLE_USER_ACCOUNT_SUCCESS";
export const DISABLE_USER_ACCOUNT_FAIL = "DISABLE_USER_ACCOUNT_FAIL";
export const DELETE_USER_ACCOUNT_FAIL = "DELETE_USER_ACCOUNT_FAIL";
export const DELETE_USER_ACCOUNT_SUCCESS = "DELETE_USER_ACCOUNT_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
// ERROR HANDLING
export const FETCH_ERRORS = "FETCH_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
// FRIEND ACTIONS
export const GET_ALL_FRIENDS_SUCCESS = "GET_ALL_FRIENDS_SUCCESS";
export const GET_ALL_FRIENDS_FAIL = "GET_ALL_FRIENDS_FAIL";
export const GET_FRIEND_SUCCESS = "GET_FRIEND_SUCCESS";
export const GET_FRIEND_FAIL = "GET_FRIEND_FAIL";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_FAIL = "ADD_FRIEND_FAIL";
export const REMOVE_FRIEND_SUCCESS = "REMOVE_FRIEND_SUCCESS";
export const REMOVE_FRIEND_FAIL = "REMOVE_FRIEND_FAIL";
export const CLEAR_FRIENDS_LIST = "CLEAR_FRIENDS_LIST";
// OTHER USER ACTIONS
export const REPORT_USER = "REPORT_USER";
export const BLOCK_USER = "BLOCK_USER";
// MESSAGES ACTIONS
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGE = "FETCH_MESSAGE";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
// potential action creators below
// ROOM ACTIONS
export const GET_ALL_ROOMS_SUCCESS = "GET_ALL_ROOMS_SUCCESS";
export const GET_ALL_ROOMS_FAIL = "GET_ALL_ROOMS_FAIL";
export const GET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";
export const GET_ROOM_FAIL = "GET_ROOM_FAIL";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAIL = "CREATE_ROOM_FAIL";
// FOR ADMINS OF ROOMS (affects everyone inside)
export const UPDATE_ROOM_SUCCESS = "UPDATE_ROOM_SUCCESS";
export const UPDATE_ROOM_FAIL = "UPDATE_ROOM_FAIL";
export const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
export const DELETE_ROOM_FAIL = "DELETE_ROOM_FAIL";
// FOR USERS OF ROOMS (affects one user only)
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_FAIL = "JOIN_ROOM_FAIL";
export const LEAVE_ROOM_SUCCESS = "LEAVE_ROOM_SUCCESS";
export const LEAVE_ROOM_FAIL = "LEAVE_ROOM_FAIL";
// for active DM rooms
export const GET_ALL_ACTIVE_DM_ROOMS_SUCCESS =
  "GET_ALL_ACTIVE_DM_ROOMS_SUCCESS";
export const GET_ALL_ACTIVE_DM_ROOMS_FAIL = "GET_ALL_ACTIVE_DM_ROOMS_FAIL";
export const ADD_ACTIVE_DM_ROOM_SUCCESS = "ADD_ACTIVE_DM_ROOM_SUCCESS";
export const ADD_ACTIVE_DM_ROOM_FAIL = "ADD_ACTIVE_DM_ROOM_FAIL";
export const REMOVE_ACTIVE_DM_ROOM_SUCCESS = "REMOVE_ACTIVE_DM_ROOM_SUCCESS";
export const REMOVE_ACTIVE_DM_ROOM_FAIL = "REMOVE_ACTIVE_DM_ROOM_FAIL";
// export const CLEAR_FRIENDS_LIST = "CLEAR_FRIENDS_LIST";

// SAME THING AS ROOMS BUT CHANNELS

// modal status actions
export const MODAL_STATUS_RESET = "MODAL_STATUS_RESET";

// loader status options
export const ACTION_SHOW_LOADER = "ACTION_SHOW_LOADER";
// export const LOGIN_FORM_SHOW_LOADER = "LOGIN_FORM_SHOW_LOADER";
// export const LOGIN_FORM_HIDE_LOADER = "LOGIN_FORM_HIDE_LOADER";
// export const EDIT_ACCOUNT_SHOW_LOADER = "EDIT_ACCOUNT_SHOW_LOADER";
// export const EDIT_ACCOUNT_HIDE_LOADER = "EDIT_ACCOUNT_HIDE_LOADER";
// export const CHANGE_PASSWORD_SHOW_LOADER = "CHANGE_PASSWORD_SHOW_LOADER";
// export const CHANGE_PASSWORD_HIDE_LOADER = "CHANGE_PASSWORD_HIDE_LOADER";

// export const  ="";
