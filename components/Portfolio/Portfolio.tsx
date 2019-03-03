import React from 'react'

import { Square } from '../../components'
import { IAsset } from '../../shared/types'
import { PortfolioBalance, PortfolioContainer, PortfolioTitle, WatchlistContainer, WatchlistTitle } from '../../styles'
import { calculateBalance } from '../../shared/utils/math';

interface IProps {
  portfolio: IAsset[];
  watchlist: IAsset[];
  edit(toggle: boolean, coin: IAsset): void;
}

export default class Portfolio extends React.PureComponent<IProps> {
  public render() {
    const { portfolio, watchlist, edit } = this.props;
    const hasWatchList = watchlist.length > 0;

    return (
      <div>
        <PortfolioBalance>
          ${calculateBalance(portfolio)}
        </PortfolioBalance>
        <PortfolioContainer>
          <PortfolioTitle>Portfolio</PortfolioTitle>
          { portfolio.map((coin, i) =>
            (<Square key={coin.currency} coin={coin} edit={edit} index={i} />)) }
        </PortfolioContainer>
        { hasWatchList &&
          <WatchlistContainer>
            <WatchlistTitle>Watchlist</WatchlistTitle>
            { watchlist.map((coin, i) =>
              (<Square key={coin.currency} coin={coin} edit={edit} index={i} watchlist />)) }
          </WatchlistContainer> }
      </div>
    );
  }
}
