import React from 'react'
import { bind } from 'decko'

import { Welcome, Astronaut, NomicsLink, PlusButton, Portfolio } from '../'
import { IPortfolioItem } from '../../shared/types'
import { StyledBoard } from '../../styles'

interface IState {
  portfolio: IPortfolioItem[];
  loading: boolean;
}

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
  },
  {
    balance: 2.46781018,
    symbol: 'DCR',
    marketCap: 63636922279.28325,
    name: 'Decred',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    balance: 2.46781018,
    symbol: 'ETH',
    marketCap: 63636922279.28325,
    name: 'Ethereum',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    balance: 2.46781018,
    symbol: 'BNB',
    marketCap: 63636922279.28325,
    name: 'Binance',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    balance: 2.46781018,
    symbol: 'LTC',
    marketCap: 63636922279.28325,
    name: 'Litecoin',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    balance: 2.46781018,
    symbol: 'LSK',
    marketCap: 63636922279.28325,
    name: 'Lisk',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },{
    balance: 2.46781018,
    symbol: 'ZRX',
    marketCap: 63636922279.28325,
    name: '0xProject',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    balance: 2.46781018,
    symbol: 'MKR',
    marketCap: 63636922279.28325,
    name: 'Maker',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    balance: 2.46781018,
    symbol: 'USDT',
    marketCap: 63636922279.28325,
    name: 'Tether',
    percentage: 66.4,
    price: 3637.33607,
    value: 8976.25,
  },
  {
    balance: 2.46781018,
    symbol: 'NANO',
    marketCap: 63636922279.28325,
    name: 'Nano',
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

    return (
      <StyledBoard>
        { !hasPortfolio && <Welcome /> }
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
  private toggleSquareEdit(toggle: boolean, coin: IPortfolioItem) {
    console.log('toggleSquareEdit...', coin);
  }
}

export default Board;
