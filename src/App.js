import "./App.css";
import { Component } from "react";
import { connect } from "react-redux";

import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import Input from "./Input";
import TotalGuesses from "./TotalGuesses";
import NewWordButton from "./NewWordButton";
import { getSecretWord, resetGame } from "./actions";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success} />
        {this.props.gaveUp && (
          <div data-test="better-luck-message">
            The secret word was {this.props.secretWord}. Better luck next time
          </div>
        )}
        <NewWordButton
          display={this.props.success || this.props.gaveUp}
          resetAction={this.props.resetGame}
        />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
        <TotalGuesses guessCount={this.props.guessedWords.length} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord, gaveUp } = state;
  return { success, guessedWords, gaveUp, secretWord };
};

const actions = {
  getSecretWord,
  resetGame,
};

export default connect(mapStateToProps, actions)(UnconnectedApp);
