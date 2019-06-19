import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import characterReducer from "./characterReducer";
import dungeonReducer from "./dungeonReducer";
import currentCharacterReducer from "./currentCharacterReducer";

const rootReducer = combineReducers({
  posts: postReducer,
  user: userReducer,
  characters: characterReducer,
  dungeons: dungeonReducer,
  currentCharacter: currentCharacterReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
