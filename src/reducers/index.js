import { combineReducers } from "redux";
import pageReducer from './pageReducer';
import cookReducer from "./cookReducer";

export default combineReducers({
  page: pageReducer,
  cooks: cookReducer
});