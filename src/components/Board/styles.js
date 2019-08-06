import styled from 'styled-components/native';
import { metrics } from '~/styles';

export const Container = styled.View`
  flex: 1;
`;

export const CardList = styled.FlatList.attrs({
  columnWrapperStyle: {
    paddingTop: 5,
    paddingBottom: 2,
    marginHorizontal: metrics.baseMargin * 2,
    justifyContent: 'space-between',
  },
})``;
