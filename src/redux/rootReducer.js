import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import { articleReducer, deleteArticle } from "./article/articleReducer";
import { categoryReducer } from "./categories/categoryReducer";
import { tagReducer } from "./tags/tagReducer";
const rootReducer = combineReducers({
  user: userReducer,
  articles: articleReducer,
  // deleteArticle: deleteArticle,
  categories: categoryReducer,
  tags: tagReducer
});

export default rootReducer;
