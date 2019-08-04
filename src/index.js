import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import '~/config/ReactotronConfig';
import createNavigator from '~/routes';

export default class App extends Component {
  state = {
    userCheckecd: false,
    userLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@MemoryGame:username');
    this.setState({
      userCheckecd: true,
      userLogged: !!username,
    });
  }

  render() {
    const { userCheckecd, userLogged } = this.state;
    if (!userCheckecd) return null;
    const Routes = createNavigator(userLogged);
    return <Routes />;
  }
}
