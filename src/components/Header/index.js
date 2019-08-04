import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {
  TouchableOpacity, StatusBar, AsyncStorage,
} from 'react-native';
import {
  Container, Title, LeftView, Icon,
} from './styles';


class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
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
    const { title } = this.props;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <LeftView />
        <Title>{title}</Title>
        <TouchableOpacity onPress={this.handleSignOut}>
          <Icon name="exchange" size={16} />
        </TouchableOpacity>
      </Container>
    );
  }
}

export default withNavigation(Header);
