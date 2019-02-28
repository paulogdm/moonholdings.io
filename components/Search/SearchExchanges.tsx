import React from 'react'

import { ExchangeSelectInfo, EnterPosition } from '../../components'
import { ExchangeSelect } from './ExchangeSelect'
import { IMarketAsset, IAsset } from '../../shared/types'
import { SearchSelectContainer, AggregateInputDiv } from '../../styles'

interface IProps {
  selected: IAsset;
  exchange: string;
  exchanges: IMarketAsset[];
  aggregate: boolean;
  checkAggregate(event: React.FormEvent<HTMLInputElement>): void;
  enterPosition(event: React.FormEvent<HTMLInputElement>): void;
  exchangeSelect(exchange: IMarketAsset): void;
}

export class SearchExchanges extends React.Component<IProps> {
  render() {
    const {
      exchange, exchanges, exchangeSelect, enterPosition,
      checkAggregate, aggregate: checked, selected
    } = this.props;

    const SelectedAsset = () => <span>{selected.name}</span>;
    const valueEntry = selected && exchange;
  
    return (
      <SearchSelectContainer>
        <h2>Select exchange for <SelectedAsset/> prices, then add to Portfolio or Watchlist.</h2>
        <ExchangeSelect exchanges={exchanges} disabled={checked} onSelect={exchangeSelect}/>
        <AggregateInputDiv>
          <input type="checkbox" defaultChecked={checked} onClick={checkAggregate}/>
          <p>Use Aggregate Exchange Data</p>
        </AggregateInputDiv>
        { !valueEntry
            ? <ExchangeSelectInfo asset={selected}/>
            : <EnterPosition asset={selected} enterPosition={enterPosition} /> } 
      </SearchSelectContainer>
    )
  }
}
