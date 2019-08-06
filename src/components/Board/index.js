import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
import Card from '~/components/Card';
import { Container, CardList } from './styles';

/**
 * @author Eduardo Reichert <edrdesigner@gmail.com>
 * @since 0.1.0 2019-08-04
 **/
export default class Board extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    solved: PropTypes.arrayOf(PropTypes.number).isRequired,
    handlePress: PropTypes.func.isRequired,
    dimension: PropTypes.number,
    disabled: PropTypes.bool.isRequired,
  }

  getKeyExtractor = (item) => {
    return String(item.id);
  };

  renderCardItem = ({ item }) => {
    const {
      solved, disabled, flipped, handlePress, dimension,
    } = this.props;

    const isDisabled = disabled || solved.includes(item.id);
    const isFlipped = flipped.includes(item.id);
    const isSolved = solved.includes(item.id);

    return (
      <Card
        key={item.id}
        id={item.id}
        width={dimension / 4.5}
        height={dimension / 4.5}
        uri={item.uri}
        flipped={isFlipped}
        solved={isSolved}
        handlePress={handlePress}
        disabled={isDisabled}
      />
    );
  }

  render() {
    const { cards } = this.props;
    return (
      <Container>
        <CardList
          data={cards}
          keyExtractor={this.getKeyExtractor}
          renderItem={this.renderCardItem}
          numColumns={2}
        />
      </Container>
    );
  }
}
