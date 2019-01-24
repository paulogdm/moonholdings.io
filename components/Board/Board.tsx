import React from 'react'
import { bind } from 'decko'
import styled from 'styled-components'

import { Welcome, Astronaut, NomicsLink, PlusButton } from '../'
import { IPortfolioItem } from '../../shared/types';

interface IState {
  portfolio: IPortfolioItem[];
  loading: boolean;
}

const StyledBoard = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const tempPortfolio = [
  {
    balance: 2.46781018,
    symbol: 'BTC',
    marketCap: 63636922279.28325,
    name: 'Bitcoin',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  }
]

class Board extends React.Component<{}, IState> {
  constructor(props: IState) {
    super(props);

    this.state = {
      portfolio: tempPortfolio,
      loading: true
    };
  }

  render() {
    const { portfolio } = this.state;
    const hasPortfolio = portfolio.length > 0;
    console.log('portfolio', portfolio);

    return (
      <StyledBoard>
        <Welcome />
        <PlusButton toggleSearch={this.handleOnSearch} />
        <NomicsLink />
        <Astronaut showLogo={hasPortfolio} />
      </StyledBoard>
    );
  }

  @bind
  private handleOnSearch() {
    console.log('handleSearchButton...');
  }
}

export default Board;
