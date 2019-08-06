import styled from 'styled-components/native';
import { colors } from '~/styles';

export const Container = styled.View`
  flex-grow: 1;
  align-items: center;
  margin: 5px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.primary};
`;

export const FlipCard = styled.TouchableOpacity`
  flex-grow: 1;
`;

export const CardImage = styled.Image`
  resize-mode: cover;
`;
