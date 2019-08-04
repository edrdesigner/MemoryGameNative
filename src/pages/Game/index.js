import React, { Component } from 'react';
import shuffle from '~/helpers/shuffle';
import Header from '~/components/Header';
import Board from '~/components/Board';
import CardsData from '~/data/cards';

import { Container } from './styles';

export default class Game extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      flipped: [],
      solved: [],
      disabled: false,
      score: 0,
      wins: 0,
      wrongGuesses: 0,
      losses: 0,
    };
  }

  componentDidMount() {
    this.handleInitDeck();
  }

  handleNewGame = () => {
    const cards = this.handleInitDeck();
    this.setState({
      solved: [],
      flipped: [],
      cards,
      wrongGuesses: 0,
      score: 0,
      disabled: false,
    });
  };

  handlePress = (id) => {
    const { flipped, solved, score } = this.state;
    this.setState({ disabled: true });
    if (flipped.length === 0) {
      this.setState({ flipped: [id], disabled: false });
    } else {
      if (this.sameCardClicked(id)) {
        this.setState({ disabled: true });
        return;
      }
      this.setState({ flipped: [flipped[0], id] });
      if (this.isMatch(id)) {
        this.setState(
          {
            solved: [...solved, flipped[0], id],
          },
          () => {
            this.resetCards();
            this.updateScore(score, this.checkScore);
          },
        );
      } else {
        this.noMatch();
      }
    }
  };

  handleInitDeck = () => shuffle(CardsData);

  sameCardClicked = (id) => {
    const { flipped } = this.state;
    return flipped.includes(id);
  };

  isMatch = (id) => {
    const { cards, flipped } = this.state;
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    return flippedCard.title === clickedCard.title;
  };

  noMatch = () => {
    const { wrongGuesses } = this.state;
    this.updateGuesses(wrongGuesses, this.checkGuesses);
    setTimeout(this.resetCards, 1000);
  };

  resetCards = () => {
    this.setState({ flipped: [], disabled: false });
  };

  updateScore = (gameScore, callback) => {
    const newScore = gameScore + 1;
    this.setState({ score: newScore }, () => {
      if (typeof callback === 'function') {
        callback(newScore);
      }
    });
  };

  updateGuesses = (wrongGuesses, callback) => {
    const { wrongGuesses: stateWrongGuesses } = this.state;
    const newGuesses = (wrongGuesses || stateWrongGuesses) + 1;

    this.setState({ wrongGuesses: newGuesses }, () => {
      if (typeof callback === 'function') {
        callback(newGuesses);
      }
    });
  };

  checkScore = (score) => {
    const { wins, cards } = this.state;
    if (score > cards.length / 2 - 1) {
      this.setState({ wins: wins + 1 }, () => {
        setTimeout(this.handleNewGame, 1000);
      });
    }
  };

  checkGuesses = (wrongGuesses) => {
    const { wrongGuesses: stateWrongGuesses, cards, losses } = this.state;
    const newGuesses = wrongGuesses || stateWrongGuesses;
    if (newGuesses > cards.length / 2 - 1) {
      this.setState({ losses: losses + 1 }, () => {
        setTimeout(this.handleNewGame, 1000);
      });
    }
  };

  render() {
    const {
      cards,
      flipped,
      disabled,
      solved,
      wins,
      losses,
      score,
      wrongGuesses,
    } = this.state;
    return (
      <Container>
        <Header
          title="Memory Game"
          wins={wins}
          losses={losses}
          score={score}
          wrongGuesses={wrongGuesses}
          newGame={this.handleNewGame}
        />
        <Board
          cards={cards}
          flipped={flipped}
          handlePress={this.handlePress}
          disabled={disabled}
          solved={solved}
        />
      </Container>
    );
  }
}
