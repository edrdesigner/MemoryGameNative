import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { FlipCard } from './styles';

export const Card = (props) => {
  const {
    id,
    flipped,
    solved,
    height,
    width,
    uri,
    handlePress,
    disabled,
  } = props;

  return (
    <FlipCard key={id} onPress={() => (disabled ? null : handlePress(id))}>
      {flipped || solved
        ? (<Image source={uri} style={{ width, height }} />)
        : (<Image source={require('~/assets/images/back.png')} style={{ width, height }} />)
      }
    </FlipCard>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  handlePress: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  solved: PropTypes.bool.isRequired,
  uri: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};
