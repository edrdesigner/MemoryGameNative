import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, FlipCard, CardImage } from './styles';

/**
 * @author Eduardo Reichert <edrdesigner@gmail.com>
 * @since 0.1.0 2019-08-04
 **/
export default Card = (props) => {
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
    <Container>
      <FlipCard key={id} onPress={() => (disabled ? null : handlePress(id))}>
        {flipped || solved
          ? (<CardImage source={uri} style={{ width, height }} />)
          : (<CardImage source={require('~/assets/images/back.png')} style={{ width, height }} />)
        }
      </FlipCard>
    </Container>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  handlePress: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  solved: PropTypes.bool.isRequired,
  uri: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};
