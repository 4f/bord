import * as types from '../constants/services';
import history from '../utils/history';

export const redirect = (to) => (dispatch) => {
  history.push(to)
  dispatch({ type: types.REDIRECT, payload: { to } })
}

export default { redirect }
