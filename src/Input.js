import React, { Component } from "react";
import { connect } from "react-redux";

import { guessWord, giveUp } from "./actions/index";

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGuess: "",
    };
  }

  submitButtonHandler = (evt) => {
    evt.preventDefault();
    const guessedWord = this.state.currentGuess;
    guessedWord && guessedWord.length > 0 && this.props.guessWord(guessedWord);
    this.setState({
      currentGuess: "",
    });
  };

  onChangeHandler = (evt) => {
    this.setState({
      currentGuess: evt.target.value,
    });
  };

  giveUpOnClickHandler = (evt) => {
    evt.preventDefault();
    this.props.giveUp();
  };

  render() {
    const contents =
      this.props.success || this.props.gaveUp ? null : (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            placeholder="enter guess"
            value={this.state.currentGuess}
            onChange={this.onChangeHandler}
          />
          <button
            data-test="submit-button"
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.submitButtonHandler}
          >
            Submit
          </button>

          <button
            data-test="give-up-button"
            onClick={this.giveUpOnClickHandler}
            className="btn btn-danger mb-2"
          >
            Give up
          </button>
        </form>
      );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = (state) => {
  const { success, gaveUp } = state;
  return { success, gaveUp };
};

const actions = {
  guessWord,
  giveUp,
};

export default connect(mapStateToProps, actions)(UnconnectedInput);
