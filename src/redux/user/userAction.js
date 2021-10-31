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
    const instance = axios.create({
      baseURL: "https://api.codermuda.com",
    });

    delete instance.defaults.headers.common.Authorization;
    dispatch(fetchUserRequest());
    instance
      .post("v1/users/auth", {
        username: username,
        password: pass,
      })
      .then((response) => {
        if (response.data.success === true) {
          dispatch(fetchUserSuccess(response.data));
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("username", username);
          axios.defaults.headers.common.Authorization =
            "Bearer " + localStorage.getItem("token");
        } else {
          dispatch(fetchUserFailure(response.data));
        }
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err));
      });
  };
};
