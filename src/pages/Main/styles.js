import styled from 'styled-components/native';
import { colors, metrics } from '~/styles';

export const Container = styled.View`
  background-color: ${colors.secondary};
  align-items: stretch;
  justify-content: center;
  flex-grow: 1;
  padding: ${metrics.baseMargin * 2}px;
`;

export const LogoText = styled.Text`
  color: ${colors.primary};
  font-size: 20px;
  font-weight: bold;
  margin-top: ${metrics.baseMargin}px;
  line-height: 21;
  text-align: center;
`;

export const InstructionText = styled.Text`
  color: ${colors.light};
  font-size: 15px;
  margin-top: ${metrics.baseMargin}px;
  text-align: center;
`;

export const ErrorText = styled.Text`
  color: ${colors.danger};
  text-align: center;
  margin-top: ${metrics.baseMargin}px;
`;

export const FormContainer = styled.View`
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const Input = styled.TextInput.attrs({
  autoCapitalize: 'none',
  inserlineColorAndroid: 'transparent',
  autoCorrect: false,
})`
    background-color: ${colors.white};
    border-radius: ${metrics.baseRadius};
    height: 44px;
    padding-left: ${metrics.basePadding}px;
    padding-right: ${metrics.basePadding}px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: ${metrics.baseRadius}px;
  height: 44px;
  margin-top: ${metrics.baseMargin}px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`;
