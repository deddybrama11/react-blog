import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  POST_CATEGORY_REQUEST,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILURE,
} from "./categoryTypes";
import Swal from "sweetalert2";
import axios from "axios";
import { errorHandling } from "redux/errorHandling";

const fetchCategoriesRequest = () => {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
};

const fetchCategoriesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

const fetchCategoriesFailure = (error) => {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
};

export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(fetchCategoriesRequest());
    return axios
      .get("/v1/categories")
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(fetchCategoriesSuccess(response.data));
        } else {
          dispatch(fetchCategoriesFailure(response.data));
          errorHandling(response.data);
        }
      })
      .catch((err) => {
        dispatch(fetchCategoriesFailure(err));
        errorHandling(err);
      });
  };
};

const deleteCategoryRequest = () => {
  return {
    type: DELETE_CATEGORY_REQUEST,
  };
};

const deleteCategorySuccess = (success) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: success,
  };
};

const deleteCategoryFailure = (err) => {
  return {
    type: DELETE_CATEGORY_FAILURE,
    payload: err,
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    dispatch(deleteCategoryRequest());
    axios
      .delete("/v1/categories/" + id)
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(deleteCategorySuccess(response.data));
          Swal.fire({
            icon: "success",
            title: "Hore..",
            text: "Data deleted successfully",
          });
          dispatch(fetchCategories());
        } else {
          dispatch(deleteCategoryFailure(response.data));
          errorHandling(response.data);
        }
      })
      .catch((err) => {
        dispatch(deleteCategoryFailure(err));
        errorHandling(err);
      });
  };
};

const postCategoryRequest = () => {
  return {
    type: POST_CATEGORY_REQUEST,
  };
};

const postCategorySuccess = (success) => {
  return {
    type: POST_CATEGORY_SUCCESS,
    payload: success,
  };
};

const postCategoryFailure = (error) => {
  return {
    type: POST_CATEGORY_FAILURE,
    payload: error,
  };
};

export const postCategory = (category) => {
  return (dispatch) => {
    dispatch(postCategoryRequest());
    return axios
      .post("/v1/categories", {
        category: category,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success === true) {
          dispatch(postCategorySuccess(response.data));
          Swal.fire({
            icon: "success",
            title: "Yayy..",
            text: "Data added successfully",
          });
          dispatch(fetchCategories());
        } else {
          dispatch(postCategoryFailure(response.data));
          errorHandling(response.data);
        }
      })
      .catch((err) => {
        dispatch(postCategoryFailure(err));
        errorHandling(err);
      });
  };
};
