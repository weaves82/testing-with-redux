import React from "react";
import { shallow } from "enzyme";

import TotalGuesses from "./TotalGuesses";
import { findByTestAttr, checkProps } from "../test/testUtils";

const defaultProps = {
  guessCount: 0,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TotalGuesses {...setupProps} />);
};

test("prop types work", () => {
  checkProps(TotalGuesses, defaultProps);
});

describe("Total Guesses component", () => {
  test("Render the component successfully", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.length).toBe(1);
  });
  test("initial value of 0", () => {
    const guessCount = 0;
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.text()).toContain(guessCount.toString());
  });
  test("Increase by after 1 guess", () => {
    const guessCount = 2;
    const wrapper = setup({ guessCount });
    const component = findByTestAttr(wrapper, "component-total-guesses");
    expect(component.text()).toContain(guessCount.toString());
  });
});
