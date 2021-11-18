import { faLeaf, fas } from "@fortawesome/free-solid-svg-icons";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_DATA_SUCCESS,
  FETCH_USERS_DATA_REQUEST,
  FETCH_USERS_DATA_FAILURE,
  POST_USER_DATA_REQUEST,
  POST_USER_DATA_SUCCESS,
  POST_USER_DATA_FAILURE,
} from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return {
        ...state,
        error: "",
      };
  }
};

export default userReducer;

const initialState2 = {
  loading: false,
  users: [],
  error: "",
  success: "",
};

export const userDataReducer = (state = initialState2, action) => {
  switch (action.type) {
    case FETCH_USERS_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case POST_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case POST_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        error: "",
      };
    case POST_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        success: "",
        error: action.payload,
      };
    default:
      return state;
  }
};
