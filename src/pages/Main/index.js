import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, ActivityIndicator, AsyncStorage } from 'react-native';
import {
  Container,
  LogoText,
  InstructionText,
  ErrorText,
  FormContainer,
  Input,
  Button,
  ButtonText,
} from './styles';

/**
 * @author Eduardo Reichert <edrdesigner@gmail.com>
 * @since 0.1.0 2019-08-04
 **/
export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    error: false,
  };

  handleChangeUser = (value) => {
    this.setState({ username: value });
  };

  handleSignIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });
    try {
      await this.saveUser(username);
      this.setState({ loading: true }, () => {
        navigation.navigate('Game');
      });
    } catch (err) {
      console.tron.log(err);
      this.setState({ loading: false, error: true });
    }
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@MemoryGame:username', username);
  };

  render() {
    const { username, loading, error } = this.state;

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <LogoText>MemoGame</LogoText>
        <InstructionText>Bem vindo</InstructionText>
        <InstructionText>
          Para continuar precisamos que voce informe um apelido:
        </InstructionText>
        {error && <ErrorText>Ops occoreu um erro!</ErrorText>}
        <FormContainer>
          <Input value={username} onChangeText={this.handleChangeUser} />
          <Button onPress={this.handleSignIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <ButtonText>Iniciar jogo</ButtonText>
            )}
          </Button>
        </FormContainer>
      </Container>
    );
  }
}
