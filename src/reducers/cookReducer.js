import { ADD_COOK, DELETE_COOK } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_COOK:
      return [...state, action.payload];
    case DELETE_COOK:
      return state.filter(cook => cook.name !== action.payload.name);
    default:
      return state;
  }
}