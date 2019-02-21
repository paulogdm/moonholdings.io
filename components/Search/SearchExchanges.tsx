import React from 'react'

import { IMarketAsset, IAsset } from '../../shared/types'
import { SearchSelectContainer, SearchSelectStyle } from '../../styles'
import { capitalizeFirstLetter as capFirst } from '../../shared/utils'

interface IProps {
  selected: IAsset;
  exchange: string;
  exchanges: IMarketAsset[];
  exchangeSelect(event: React.FormEvent<HTMLSelectElement>): void;
}

export const SearchExchanges = (props: IProps) => {
  const { exchange, exchanges, exchangeSelect, selected } = props;
  const SelectedAsset = () => <span>{selected.name}</span>;
  const ExchangesCount = () => {
    const pural = exchanges.length > 1 && 's';
    return (<option key={'default'}>({exchanges.length}) Exchange{pural}:</option>);
  };

  return (
    <SearchSelectContainer>
      <h2>Select exchange for <SelectedAsset/> prices, then add to Portfolio or Watchlist.</h2>
      <SearchSelectStyle value={exchange} onChange={exchangeSelect}>
        <ExchangesCount/>
        {exchanges.map((exchange, i) => (<option key={i}>{capFirst(exchange.exchange)}</option>))}
      </SearchSelectStyle>
      <h2>Exchanges with <span>{selected.currency}</span> denominated in USD, USDC, or USDT will be listed above. Otherwise the asset may only be denominated in BTC or another cryptocurrency and it's price will be an aggregate of supported exchanges.</h2>
    </SearchSelectContainer>
  )
}
