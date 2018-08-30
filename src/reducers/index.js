import openReducers from "./openReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  open: openReducers
});

export default rootReducer;
