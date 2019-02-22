import React from 'react'

import { ExchangeSelectInfo, ExchangesCount, EnterPosition } from '../../components'
import { IMarketAsset, IAsset } from '../../shared/types'
import { SearchSelectContainer, SearchSelectStyle } from '../../styles'
import { capitalizeFirstLetter as capFirst } from '../../shared/utils'

interface IProps {
  selected: IAsset;
  exchange: string;
  exchanges: IMarketAsset[];
  enterPosition(event: React.FormEvent<HTMLInputElement>): void;
  exchangeSelect(event: React.FormEvent<HTMLSelectElement>): void;
}

export const SearchExchanges = (props: IProps) => {
  const { exchange, exchanges, exchangeSelect, enterPosition, selected } = props;
  const SelectedAsset = () => <span>{selected.name}</span>;
  const valueEntry = selected && exchange;

  return (
    <SearchSelectContainer>
      <h2>Select exchange for <SelectedAsset/> prices, then add to Portfolio or Watchlist.</h2>
      <SearchSelectStyle value={exchange} onChange={exchangeSelect}>
        <ExchangesCount exchanges={exchanges}/>
        {exchanges.map((exchange, i) => (<option key={i}>{capFirst(exchange.exchange)}</option>))}
      </SearchSelectStyle>
      { !valueEntry
          ? <ExchangeSelectInfo asset={selected}/>
          : <EnterPosition asset={selected} enterPosition={enterPosition} /> } 
    </SearchSelectContainer>
  )
}
