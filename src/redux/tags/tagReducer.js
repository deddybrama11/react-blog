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

const initialState = {
  loading: false,
  tags: [],
  error: "",
  success: "",
};
export const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: action.payload,
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case POST_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case DELETE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
