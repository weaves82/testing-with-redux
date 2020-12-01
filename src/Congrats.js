import React from "react";

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {} props - Component props specific to this setup.
 * @returns {JSX.Element}
 */

export default (props) => {
  if (props.success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};
