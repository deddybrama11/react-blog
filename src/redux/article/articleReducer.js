import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from "./articleTypes";

const initialState = {
  loading: false,
  posts: [],
  error: "",
  update: false,
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: "",
        update: false,
      };
    case FETCH_POSTS_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload,
      };

    default:
      return {
        ...state,
        error: "",
      };
  }
};

// const initialStateDelete = {
//   loading: false,
//   success: "",
//   error: "",
// };

export const deleteArticle = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        update: true,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
        error: "",
      };
  }
};
