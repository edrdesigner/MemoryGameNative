import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RNIcons from 'react-native-vector-icons/FontAwesome';
import { colors, metrics } from '~/styles';


export const Container = styled.View`
  align-items: center;
  background-color: ${colors.secondary};
  border-bottom-color: ${colors.primary};
  border-bottom-width: 1px;
  flex-direction: row;
  height: ${54 + getStatusBarHeight()}px;
  justify-content: space-between;
  padding-right: ${metrics.basePadding};
  padding-left: ${metrics.basePadding};
  padding-top: ${getStatusBarHeight()};
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`;

export const LeftView = styled.View`
`;

export const Icon = styled(RNIcons)`
  color: ${colors.white};
`;
