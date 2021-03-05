import React from "react";
import PropTypes from "prop-types";

const NewWordButton = (props) => {
  const onClickHandler = (evt) => {
    evt.preventDefault();
    props.resetAction();
  };

  return (
    props.display && (
      <button
        data-test="component-new-word-button"
        className="btn btn-primary spacer-bottom"
        onClick={onClickHandler}
      >
        Get New Word
      </button>
    )
  );
};

NewWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  resetAction: PropTypes.func,
};

export default NewWordButton;
