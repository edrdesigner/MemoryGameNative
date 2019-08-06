import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import RNIcons from 'react-native-vector-icons/FontAwesome';
import { colors, metrics } from '~/styles';

export const Container = styled.View`
  align-items: center;
  background-color: ${colors.secondary};
  border-bottom-color: ${colors.primary};
  border-bottom-width: 1px;
  flex-direction: row;
  height: ${44 + getStatusBarHeight()}px;
  justify-content: space-between;
  padding-right: ${metrics.basePadding};
  padding-left: ${metrics.basePadding};
  padding-top: ${getStatusBarHeight()}px;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 13px;
  font-weight: bold;
`;

export const LeftView = styled.View`
`;

export const ScoreView = styled.View`
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
`;

export const ScoreText = styled.Text`
  font-size: 11px;
  color: ${colors.white}
`;

export const Icon = styled(RNIcons)`
  color: ${colors.white};
`;
