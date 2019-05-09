import { ADD_COOK } from './types';

export const addCook = cook => dispatch => {
  dispatch({
    type: ADD_COOK,
    payload: cook
  });
}