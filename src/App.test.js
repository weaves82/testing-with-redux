import React from "react";
import {
  shallow
} from "enzyme";
import {
  findByTestAttr,
  storeFactory
} from "../test/testUtils";

import App, {
  UnconnectedApp
} from "./App";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow( < App store = {
        store
      }
      />)
      .dive()
      .dive();
      return wrapper;
    };

    describe("Redux props successfully passed to 'App'", () => {
          test("has access to 'success' state", () => {
            const success = true;
            const wrapper = setup({
              success
            });
            const successProp = wrapper.instance().props.success;
            expect(successProp).toBe(success);
          });
          test("has access to 'secretWord' state", () => {
            const secretWord = "party";
            const wrapper = setup({
              secretWord
            });
            const secretWordProp = wrapper.instance().props.secretWord;
            expect(secretWordProp).toBe(secretWord);
          });
          test("has access to 'guessedWord' state", () => {
            const guessedWords = [{
              guessedWord: "train",
              letterMatchCount: 3
            }];
            const wrapper = setup({
              guessedWords
            });
            const guessedWordsProp = wrapper.instance().props.guessedWords;
            expect(guessedWordsProp).toBe(guessedWords);
          });
          test("has access to 'gaveUp' state", () => {
            const gaveUp = false;
            const wrapper = setup({
              gaveUp
            });
            const gaveUpProp = wrapper.instance().props.gaveUp;
            expect(gaveUpProp).toBe(gaveUp);
          });
          test("the 'getSecretWord' action creator is a function prop", () => {
            const wrapper = setup();
            const getSecretWordProp = wrapper.instance().props.getSecretWord;
            expect(getSecretWordProp).toBeInstanceOf(Function);
          });
          test("the 'resetGame' action creator is a function prop", () => {
            const wrapper = setup();
            const resetGameProp = wrapper.instance().props.resetGame;
            expect(resetGameProp).toBeInstanceOf(Function);
          });
          test("getSecretWord on App mount", () => {
              const getSecretWordMock = jest.fn();

              const props = {
                getSecretWord: getSecretWordMock,
                success: true,
                guessedWords: [],
              };

              const wrapper = shallow( < UnconnectedApp {
                  ...props
                }
                />);

                wrapper.instance().componentDidMount();
                const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

                expect(getSecretWordCallCount).toBe(1);
              });
          });

        describe("Better Luck message rendering", () => {
          test("better luck next time message is not displayed on load", () => {
            const gaveUp = false;
            const wrapper = setup({
              gaveUp
            });
            console.log(wrapper.debug())
            const betterLuckMessage = findByTestAttr(wrapper, "better-luck-message");
            expect(betterLuckMessage.length).toBe(0);
          });
          test("better luck next time message is displayed after giving up", () => {
            const gaveUp = true;
            const wrapper = setup({
              gaveUp
            });
            const betterLuckMessage = findByTestAttr(wrapper, "better-luck-message");
            expect(betterLuckMessage.length).toBe(1);
          });
        });