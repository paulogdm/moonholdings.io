import React from 'react'

import { Square } from '../../components'
import { IAsset } from '../../shared/types'
import { PortfolioWrapper, PortfolioContainer, PortfolioTitle, WatchlistContainer, WatchlistTitle }
  from '../../styles'

interface IProps {
  portfolio: IAsset[];
  watchlist: IAsset[];
  edit(toggle: boolean, coin: IAsset): void;
}

export default class Portfolio extends React.PureComponent<IProps> {
  public render() {
    const { portfolio, watchlist, edit } = this.props;
    const hasPortfolio = portfolio.length > 0;
    const hasWatchList = watchlist.length > 0;

    return (
      <PortfolioWrapper>
        <PortfolioContainer>
          { hasPortfolio && <PortfolioTitle>Portfolio</PortfolioTitle> }
          { portfolio.map((coin, i) =>
            (<Square key={coin.currency} coin={coin} edit={edit} index={i} />)) }
        </PortfolioContainer>
        { hasWatchList &&
          <WatchlistContainer>
            { hasWatchList && <WatchlistTitle>Watchlist</WatchlistTitle> }
            { watchlist.map((coin, i) =>
              (<Square key={coin.currency} coin={coin} edit={edit} index={i} watchlist />)) }
          </WatchlistContainer> }
      </PortfolioWrapper>
    );
  }
}
