import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '~/components/Card';

import { Container, CardList } from './styles';

export default class Board extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    solved: PropTypes.arrayOf(PropTypes.number).isRequired,
    handlePress: PropTypes.func.isRequired,
    // dimension: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  renderCardItem = ({ item }) => {
    const {
      solved, disabled, flipped, handlePress,
    } = this.props;
    const isDisabled = disabled || solved.includes(item.id);
    const isFlipped = flipped.includes(item.id);
    const isSolved = solved.includes(item.id);
    return (
      <Card
        key={item.id}
        id={item.id}
        width={100}
        height={100}
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
          keyExtractor={item => String(item.id)}
          renderItem={this.renderCardItem}
          onRefresh={this.loadOrganizations}
          numColumns={2}
        />
      </Container>
    );
  }
}
