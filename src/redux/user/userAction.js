import axios from "axios";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from "./userTypes";

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = (username, pass) => {
  return (dispatch) => {
    delete axios.defaults.headers.common["Authorization"];
    dispatch(fetchUserRequest());
    axios
      .post("v1/users/auth", {
        username: username,
        password: pass,
      })
      .then((response) => {
        if (response.data.success === true) {
          dispatch(fetchUserSuccess(response.data));
        } else {
          dispatch(fetchUserFailure(response.data));
        }
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err));
      });
  };
};
