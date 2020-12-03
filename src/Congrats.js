import React from "react";
import PropTypes from "prop-types";

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {} props - Component props specific to this setup.
 * @returns {JSX.Element}
 */

const Congrats = (props) => {
  if (props.success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
