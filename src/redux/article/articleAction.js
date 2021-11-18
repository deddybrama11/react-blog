import axios from "axios";
import Swal from "sweetalert2";
import { errorHandling } from "redux/errorHandling";
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  POST_POST_REQUEST,
  POST_POST_SUCCESS,
  POST_POST_FAILURE,
} from "./articleTypes";

const fetchPostRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

const fetchPostFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error,
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostRequest());
    return axios
      .get("/v1/posts")
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(fetchPostSuccess(response.data.data.posts));
        } else {
          dispatch(fetchPostFailure(response.data));
          errorHandling(response.data);
        }
      })
      .catch((err) => {
        dispatch(fetchPostFailure(err));
        errorHandling(err);
      });
  };
};

const deletePostRequest = () => {
  return {
    type: DELETE_POST_REQUEST,
  };
};

const deletePostSuccess = (data) => {
  return {
    type: DELETE_POST_SUCCESS,
  };
};

const deletePostFailure = (error) => {
  return {
    type: DELETE_POST_FAILURE,
    payload: error,
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    dispatch(deletePostRequest());
    return axios
      .delete("/v1/posts/" + id)
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(deletePostSuccess(response));
          dispatch(fetchPosts());
          Swal.fire({
            icon: "success",
            title: "Hore..",
            text: "Data deleted successfully",
          });
        } else {
          dispatch(deletePostFailure(response.data));
          errorHandling(response.data);
        }
      })
      .catch((err) => {
        dispatch(deletePostFailure(err));
        errorHandling(err);
      });
  };
};

const postPostRequest = () => {
  return {
    type: POST_POST_REQUEST,
  };
};

const postPostSuccess = (data) => {
  return {
    type: POST_POST_SUCCESS,
    payload: data,
  };
};

const postPostFailure = (error) => {
  return {
    type: POST_POST_FAILURE,
    payload: error,
  };
};
