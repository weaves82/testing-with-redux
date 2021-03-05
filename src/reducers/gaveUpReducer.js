import { actionTypes } from "../actions";

/**
 * @function gaveUpReducer
 * @params {boolean} state - boolean
 * @params {object} action - action to be reduced
 * @returns {boolean} - new success state
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.GAVE_UP:
      return true;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};
