import styled from 'styled-components/native';
import { metrics } from '~/styles';

export const Container = styled.View`
    flex-grow: 1,
`;

export const CardList = styled.FlatList.attrs({
  columnWrapperStyle: {
    marginHorizontal: metrics.baseMargin * 2,
    justifyContent: 'space-between',
  },
})``;
