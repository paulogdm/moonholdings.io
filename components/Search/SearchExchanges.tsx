import React from 'react'
import { bind } from 'decko'

import { ExchangeSelectInfo, ExchangesCount, EnterPosition } from '../../components'
import { IMarketAsset, IAsset } from '../../shared/types'
import { SearchSelectContainer, SearchSelectStyle, AggregateInput } from '../../styles'
import { capitalizeFirstLetter as capFirst } from '../../shared/utils'

interface IProps {
  selected: IAsset;
  exchange: string;
  exchanges: IMarketAsset[];
  enterPosition(event: React.FormEvent<HTMLInputElement>): void;
  exchangeSelect(event: React.FormEvent<HTMLSelectElement>): void;
}

interface IState {
  disableSelect: boolean;
  aggregateSelected: boolean;
}

// export const SearchExchanges = (props: IProps) => {
export class SearchExchanges extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      disableSelect: false,
      aggregateSelected: false
    }
  }

  render() {
    const { exchange, exchanges, exchangeSelect, enterPosition, selected } = this.props;
    const SelectedAsset = () => <span>{selected.name}</span>;
    const valueEntry = selected && exchange;
  
    return (
      <SearchSelectContainer>
        <h2>Select exchange for <SelectedAsset/> prices, then add to Portfolio or Watchlist.</h2>
        <SearchSelectStyle id="exchange-select" value={exchange} onChange={exchangeSelect}>
          <ExchangesCount exchanges={exchanges}/>
          {exchanges.map((exchange, i) =>
            (<option key={i} value={[exchange.exchange, exchange.quote]}>
              {capFirst(exchange.exchange)} ({exchange.quote}) ${exchange.price_quote}
            </option>))}
        </SearchSelectStyle>
        <AggregateInput>
          <input
            type="checkbox"
            name="aggregate"
            // value={this.state.aggregateSelected}
            onClick={this.handleCheckAggregate}
          /> Use Aggregate Data
        </AggregateInput>
        { !valueEntry
            ? <ExchangeSelectInfo asset={selected}/>
            : <EnterPosition asset={selected} enterPosition={enterPosition} /> } 
      </SearchSelectContainer>
    )
  }

  @bind
  handleCheckAggregate(event: React.FormEvent<HTMLInputElement>) {
    console.log('handleCheckAggregate');
  }
}
