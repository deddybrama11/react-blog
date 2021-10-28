import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import { articleReducer, deleteArticle } from "./article/articleReducer";
import { categoryReducer } from "./categories/categoryReducer";
const rootReducer = combineReducers({
  user: userReducer,
  articles: articleReducer,
  // deleteArticle: deleteArticle,
  categories: categoryReducer,
});

export default rootReducer;
