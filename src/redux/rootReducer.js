import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import articleReducer from "./article/articleReducer"
const rootReducer = combineReducers({
  user: userReducer,
  articles: articleReducer,
});

export default rootReducer;
