import { combineReducers } from "redux";
import pageReducer from './pageReducer';
import cookReducer from "./cookReducer";
import resultsReducer from "./resultsReducer";
import tableReducer from "./tableReducer";

export default combineReducers({
  page: pageReducer,
  cooks: cookReducer,
  results: resultsReducer,
  table: tableReducer
});