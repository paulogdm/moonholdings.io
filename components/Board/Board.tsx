import React from 'react'
import { bind } from 'decko'

import { Welcome, Astronaut, NomicsLink, PlusButton, Portfolio } from '../'
import { IPortfolioItem } from '../../shared/types';
import { board } from '../../styles'

interface IState {
  portfolio: IPortfolioItem[];
  loading: boolean;
}

const { StyledBoard } = board;

//@TODO to remove...
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
        <Portfolio
          coins={portfolio}
          edit={this.toggleSquareEdit}
        />
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

  @bind
  private toggleSquareEdit() {
    console.log('toggleSquareEdit...');
  }
}

export default Board;
