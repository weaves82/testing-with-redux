import axios from "axios";

import {
  getLetterMatchCount
} from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD",
  RESET_GAME: "RESET_GAME",
  GAVE_UP: "GAVE_UP",
};

export const guessWord = (guessedWord) => {
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: {
        guessedWord,
        letterMatchCount,
      },
    });

    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS,
      });
    }
  };
};

export const getSecretWordDispatch = (dispatch) => {
  return axios.get("http://localhost:3030").then((response) => {
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: response.data,
    });
  });
};

export const getSecretWord = () => {
  return getSecretWordDispatch;
};

export const resetGame = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_GAME,
    });
    return getSecretWordDispatch(dispatch);
  };
};

export const giveUp = () => {
  return {
    type: actionTypes.GAVE_UP,
  };
};