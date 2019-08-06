import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import shuffle from '~/helpers/shuffle';
import Header from '~/components/Header';
import Board from '~/components/Board';
import CardsData from '~/data/cards';
import { Container } from './styles';

const TIMEOUT_NEW_GAME = 1000;
const TIMEOUT_RESET = 1000;
const DEFAULT_DIMENSION = 450;

/**
 * @author Eduardo Reichert <edrdesigner@gmail.com>
 * @since 0.1.0 2019-08-04
 **/
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
    const cards = this.handleInitDeck();
    const dimension = this.handleDimensions();
    this.setState({ cards, dimension });
  }

  handleDimensions = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    if (screenWidth && screenHeight) {
      return Math.min(screenWidth, screenHeight)
    }

    return DEFAULT_DIMENSION;
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

  handleInitDeck = () => {
    let id = 0;
    const cards = CardsData.reduce((acc, item) => {
      acc.push({
        ...item,
        id: id++,
      });
      acc.push({
        ...item,
        id: id++,
      });
      return acc;
    }, []);

    return shuffle(cards);
  }

  handlePress = (id) => {
    const { flipped, solved, score } = this.state;
    this.setState({ disabled: true });
    if (flipped.length === 0) {
      this.setState({ flipped: [id], disabled: false });
    } else {
      if (this.sameCardClicked(id)) {
        this.setState({ disabled: false });
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
    setTimeout(this.resetCards, TIMEOUT_RESET);
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
        setTimeout(this.handleNewGame, TIMEOUT_NEW_GAME);
      });
    }
  };

  checkGuesses = (wrongGuesses) => {
    const { wrongGuesses: stateWrongGuesses, cards, losses } = this.state;
    const newGuesses = wrongGuesses || stateWrongGuesses;
    if (newGuesses > cards.length / 2 - 1) {
      this.setState({ losses: losses + 1 }, () => {
        setTimeout(this.handleNewGame, TIMEOUT_NEW_GAME);
      });
    }
  };

  render() {
    const {
      cards,
      flipped,
      disabled,
      dimension,
      solved,
      wins,
      losses,
      score,
      wrongGuesses,
    } = this.state;
    return (
      <Container>
        <Header
          title="Jogo"
          wins={wins}
          losses={losses}
          score={score}
          wrongGuesses={wrongGuesses}
          newGame={this.handleNewGame}
        />
        <Board
          cards={cards}
          flipped={flipped}
          dimension={dimension}
          solved={solved}
          handlePress={this.handlePress}
          disabled={disabled}
        />
      </Container>
    );
  }
}
