import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";

import NewWordButton from "./NewWordButton";

const defaultProps = {
  display: false,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<NewWordButton {...setupProps} />);
  return wrapper;
};

describe("rendering the NewButton", () => {
  test("NewButton renders ok", () => {
    const wrapper = setup({ display: true, resetAction: () => {} });
    const newWordButton = findByTestAttr(wrapper, "component-new-word-button");
    expect(newWordButton.length).toBe(1);
  });
  test("doesn't render button when not displayed", () => {
    const wrapper = setup();
    const newWordButton = findByTestAttr(wrapper, "component-new-word-button");
    expect(newWordButton.length).toBe(0);
  });
  test("action creator for 'resetGame' is correctly called", () => {
    const restGameMock = jest.fn();
    const wrapper = setup({ display: true, resetAction: restGameMock });
    const newWordButton = findByTestAttr(wrapper, "component-new-word-button");
    newWordButton.simulate("click", { preventDefault() {} });
    const newWordButtonCount = restGameMock.mock.calls.length;
    expect(newWordButtonCount).toBe(1);
  });
});

test("the correct prop types being used", () => {
  checkProps(NewWordButton, { display: false, resetAction: () => {} });
});
