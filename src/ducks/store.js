import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import characterReducer from "./characterReducer";

const rootReducer = combineReducers({
  posts: postReducer,
  user: userReducer,
  characters: characterReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
