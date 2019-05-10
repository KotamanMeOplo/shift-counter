import { ADD_COOK, DELETE_COOK } from './types';

export const addCook = cook => dispatch => {
  dispatch({
    type: ADD_COOK,
    payload: cook
  });
}

export const deleteCook = cook => dispatch => {
  dispatch({
    type: DELETE_COOK,
    payload: cook
  });
}