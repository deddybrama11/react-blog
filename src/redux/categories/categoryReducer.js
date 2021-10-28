import {
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  POST_CATEGORY_REQUEST,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILURE,
} from "./categoryTypes";

const initialState = {
  loading: false,
  categories: [],
  error: "",
  success: "",
  btnLoading: false,
};
export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_CATEGORY_REQUEST:
      return {
        ...state,
        btnLoading: true,
      };
    case POST_CATEGORY_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case POST_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
