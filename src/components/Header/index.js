import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {
  TouchableOpacity, StatusBar, AsyncStorage,
} from 'react-native';
import {
  Container, Title, LeftView, Icon, ScoreView, ScoreText,
} from './styles';

/**
 * @author Eduardo Reichert <edrdesigner@gmail.com>
 * @since 0.1.0 2019-08-04
 **/
class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    wins: PropTypes.number,
    losses: PropTypes.number,
    score: PropTypes.number,
    wrongGuesses: PropTypes.number,
    newGame: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  handleSignOut = async () => {
    const { navigation } = this.props;
    await AsyncStorage.clear();
    navigation.navigate('Main');
  };

  render() {
    const { title, wins, losses, score, wrongGuesses, newGame } = this.props;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Title>{title}</Title>
        <ScoreView>
          <ScoreText>{`Ganhou: ${wins}`}</ScoreText>
        </ScoreView>
        <ScoreView>
          <ScoreText>{`Perdeu: ${losses}`}</ScoreText>
        </ScoreView>
        <ScoreView>
          <ScoreText>{`Acertou: ${score}/5`}</ScoreText>
        </ScoreView>
        <ScoreView>
          <ScoreText>{`Errou: ${wrongGuesses}/5`}</ScoreText>
        </ScoreView>
        <TouchableOpacity onPress={this.handleSignOut}>
          <Icon name="exchange" size={16} />
        </TouchableOpacity>
      </Container>
    );
  }
}

export default withNavigation(Header);
