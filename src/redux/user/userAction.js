import axios from "axios";
import Swal from "sweetalert2";
import { errorHandling } from "redux/errorHandling";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_DATA_REQUEST,
  FETCH_USERS_DATA_SUCCESS,
  FETCH_USERS_DATA_FAILURE,
  POST_USER_DATA_REQUEST,
  POST_USER_DATA_SUCCESS,
  POST_USER_DATA_FAILURE,
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

const fetchUserDataRequest = () => {
  return {
    type: FETCH_USERS_DATA_REQUEST,
  };
};

const fetchUserDataSuccess = (user) => {
  return {
    type: FETCH_USERS_DATA_SUCCESS,
    payload: user,
  };
};

const fetchUserDataFailure = (error) => {
  return {
    type: FETCH_USERS_DATA_FAILURE,
    payload: error,
  };
};

export const fetchUserData = () => {
  return (dispatch) => {
    dispatch(fetchUserDataRequest());
    return axios
      .get("v1/users/username/" + localStorage.getItem("username"))
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(fetchUserDataSuccess(response.data.data));
        } else {
          dispatch(fetchUserDataFailure(response.data));
          errorHandling(response.data);
        }
      })
      .catch((err) => {
        dispatch(fetchUserDataFailure(err));
        errorHandling(err);
      });
  };
};

const postUserDataRequest = () => {
  return {
    type: POST_USER_DATA_REQUEST,
  };
};

const postUserDataSuccess = (success) => {
  return {
    type: POST_USER_DATA_SUCCESS,
    payload: success,
  };
};

const postUserDataFailure = (err) => {
  return {
    type: POST_USER_DATA_FAILURE,
    payload: err,
  };
};

export const postUserData = (data) => {
  return (dispatch) => {
    dispatch(postUserDataRequest());
    console.log(data)
    return axios
      .put("v1/users/" + data.id_user, {
        name: data.name,
        city: data.city,
        country: data.country,
        birthday: data.birthday,
        web_profile: data.webProfile,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(postUserDataSuccess(response.data));
          Swal.fire({
            icon: "success",
            title: "Horee..",
            text: "Data updated successfully",
          });
          dispatch(fetchUserData());
        } else {
          dispatch(postUserDataFailure(response.data));
          errorHandling(response.data);
        }
      })
      .catch((err) => {
        dispatch(postUserDataFailure(err));
        errorHandling(err);
      });
  };
};
