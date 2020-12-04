import { actionTypes } from "../actions";

/**
 * @function successReducer
 * @params {array} state - Array of guessed words
 * @params {object} action - action to be reduced
 * @returns {boolean} - new success state
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;
    default:
      return state;
  }
};
