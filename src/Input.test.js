import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @params {object} initialState
 * @returns {ShallowWrapper}
 */

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("does not render submit button", () => {
      const submit = findByTestAttr(wrapper, "submit-button");
      expect(submit.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("the success prop is succesfully passed", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("the 'guessWord' action creator is a function prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
  describe("calling submit button", () => {
    let wrapper;
    let guessWordMock;
    const guessedWord = "train";
    beforeEach(() => {
      guessWordMock = jest.fn();

      const props = {
        guessWord: guessWordMock,
      };

      wrapper = shallow(<UnconnectedInput {...props} />);

      wrapper.setState({ currentGuess: guessedWord });

      const submitButton = findByTestAttr(wrapper, "submit-button");

      submitButton.simulate("click", { preventDefault() {} });
    });
    test("that 'guessWord' is called on submit", () => {
      const guessWordCallCount = guessWordMock.mock.calls.length;
      expect(guessWordCallCount).toBe(1);
    });
    test("that 'guessword' is called with correct arguments", () => {
      const guessWordCallArg = guessWordMock.mock.calls[0][0];
      expect(guessWordCallArg).toBe(guessedWord);
    });
  });
});
