import React, { Component } from "react";
import { connect } from "react-redux";

import { guessWord } from "./actions/index";

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGuess: null,
    };
    this.submitButtonHandler = this.submitButtonHandler.bind(this);
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

  render() {
    const contents = this.props.success ? null : (
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
      </form>
    );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
