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

interface IPropsExchangeMessage {
  selected: IAsset;
}

const SelectExchangeMessage = ({ selected }: IPropsExchangeMessage) => {
  const SelectedAsset = () => <span>{selected.name}</span>;
  return (<h2>Select exchange for <SelectedAsset/> prices, then add to Portfolio or Watchlist.</h2>);
}

const AggregateSelected = () =>
  <h2>You have selected to use aggregate exchange price data.</h2>;

export class SearchExchanges extends React.Component<IProps> {
  render() {
    const {
      exchange, exchanges, exchangeSelect, enterPosition,
      checkAggregate, aggregate: checked, selected
    } = this.props;

    const userCanAddPosition = selected && exchange;
  
    return (
      <SearchSelectContainer>
        { checked ? <AggregateSelected/> : <SelectExchangeMessage selected={selected}/> }
        <ExchangeSelect exchanges={exchanges} disabled={checked} onSelect={exchangeSelect}/>
        <AggregateInputDiv>
          <input type="checkbox" defaultChecked={checked} onClick={checkAggregate}/>
          <p>Use Aggregate Exchange Data</p>
        </AggregateInputDiv>
        { !userCanAddPosition && !checked
            ? <ExchangeSelectInfo asset={selected}/>
            : <EnterPosition asset={selected} enterPosition={enterPosition} /> } 
      </SearchSelectContainer>
    )
  }
}
