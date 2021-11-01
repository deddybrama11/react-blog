import axios from "axios";
import Swal from "sweetalert2";
import { errorHandling } from "redux/errorHandling";
import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  POST_TAG_REQUEST,
  POST_TAG_SUCCESS,
  POST_TAG_FAILURE,
  DELETE_TAG_REQUEST,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE,
} from "./tagTypes";

const fetchTagsRequest = () => {
  return {
    type: FETCH_TAGS_REQUEST,
  };
};

const fetchTagsSuccess = (tags) => {
  return {
    type: FETCH_TAGS_SUCCESS,
    payload: tags,
  };
};

const fetchTagsFailure = (error) => {
  return {
    type: FETCH_TAGS_FAILURE,
    payload: error,
  };
};

export const fetchTags = () => {
  return (dispatch) => {
    dispatch(fetchTagsRequest());
    return axios
      .get("/v1/tags")
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(fetchTagsSuccess(response.data));
        } else {
          dispatch(fetchTagsFailure(response.data));
        }
      })
      .catch((err) => {
        dispatch(fetchTagsFailure(err));
        errorHandling(err);
      });
  };
};

const postTagRequest = () => {
  return {
    type: POST_TAG_REQUEST,
  };
};

const postTagSuccess = (success) => {
  return {
    type: POST_TAG_SUCCESS,
    payload: success,
  };
};

const postTagFailure = (err) => {
  return {
    type: POST_TAG_FAILURE,
    payload: err,
  };
};

export const postTag = (tag) => {
  return (dispatch) => {
    dispatch(postTagRequest());
    return axios
      .post("/v1/tags", {
        tag: tag,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(postTagSuccess(response.data));
          Swal.fire({
            icon: "success",
            title: "Yayy..",
            text: "Data added successfully",
          });
          dispatch(fetchTags());
        } else {
          dispatch(postTagFailure(response.data));
        }
      })
      .catch((err) => {
        dispatch(postTagFailure(err));
        errorHandling(err);
      });
  };
};

const deleteTagRequest = () => {
  return {
    type: DELETE_TAG_REQUEST,
  };
};

const deleteTagSuccess = (success) => {
  return {
    type: DELETE_TAG_SUCCESS,
    payload: success,
  };
};

const deleteTagFailure = (err) => {
  return {
    type: DELETE_TAG_FAILURE,
    payload: err,
  };
};

export const deleteTag = (id) => {
  return (dispatch) => {
    dispatch(deleteTagRequest());
    return axios
      .delete("/v1/tags/" + id)
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(deleteTagSuccess(response.data));
          Swal.fire({
            icon: "success",
            title: "Horee..",
            text: "Data deleted successfully",
          });
          dispatch(fetchTags());
        } else {
          dispatch(deleteTagFailure(response.data));
        }
      })
      .catch((err) => {
        dispatch(deleteTagFailure(err));
      });
  };
};
