import axios from "axios";
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} from "./articleTypes";
import Swal from "sweetalert2";

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
    axios
      .get("/v1/posts")
      .then((response) => {
        if (response.data.success === true) {
          dispatch(fetchPostSuccess(response.data.data.posts));
        } else {
          dispatch(fetchPostFailure(response.data));
        }
      })
      .catch((err) => {
        dispatch(fetchPostFailure(err));
        // Swal.fire({
        //     position: 'top-end',
        //     icon: 'success',
        //     title: 'Your work has been saved',
        //     showConfirmButton: false,
        //     timer: 1500
        //   })
      });
  };
};
