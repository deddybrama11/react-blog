import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import { articleReducer, deleteArticle } from "./article/articleReducer";
const rootReducer = combineReducers({
  user: userReducer,
  articles: articleReducer,
  // deleteArticle: deleteArticle,
});

export default rootReducer;
