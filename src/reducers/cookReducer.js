import { ADD_COOK } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_COOK:
      return [...state, action.payload];
    default:
      return state;
  }
}