import { correctGuess, actionTypes } from "./";

describe("correctGuess", () => {
  test('to make sure action returns with type "CORRECT_GUESS"', () => {
    const action = correctGuess();
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
