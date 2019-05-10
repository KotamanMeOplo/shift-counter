import { FETCH_COOKS } from './types';

export const fetchCooks = () => dispatch => {
  const cooks = JSON.parse(localStorage.getItem('cooks')) || [];

  dispatch({
    type: FETCH_COOKS,
    payload: cooks
  });
}