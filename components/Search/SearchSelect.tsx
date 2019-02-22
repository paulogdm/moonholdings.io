import React from 'react'
import { bind } from 'decko'
import * as R from 'ramda'

// components
import { BlockLoader, Square } from '..'
import { IAsset, IMarketAsset } from '../../shared/types'
import {
  SearchSelectContainer, SearchSelectStyle, SearchSelectLoader,
  SearchSelectAsset, SquareContainer
} from '../../styles'

interface IProps {
  assets: IAsset[];
  selected: IAsset;
  exchanges: IMarketAsset[]; 
  exchange: string;
  fetching: boolean;
  exchangeSelect(event: React.FormEvent<HTMLSelectElement>): void;
}

class SearchSelect extends React.Component<IProps> {
  render() {
    const { selected, exchanges, exchange, fetching } = this.props;
    const exchangesExist = R.not(R.isEmpty(exchanges));
  
    return (
      <div>
        { fetching
          ? <SearchSelectLoader><BlockLoader/></SearchSelectLoader>
          : exchangesExist ? this.renderSearchSelect(exchange, exchanges) : this.renderSelection(selected) }
      </div>
    );
  }

  @bind
  private renderSearchSelect(exchange: string, exchanges: IMarketAsset[]) {
    return (<SearchSelectContainer>
      <h2>Select your exchange</h2>
      <SearchSelectStyle value={exchange} onChange={this.props.exchangeSelect}>
        {exchanges.map((exchange, i) => (<option key={i}>{exchange.exchange}</option>))}
      </SearchSelectStyle>
    </SearchSelectContainer>)
  }

  @bind
  private renderSelection(selected: IAsset) {
    return (
      <SearchSelectAsset>
        <h2>No USD, USDC or USDT based exchanges found, using aggregate exchange data.</h2>
        <SquareContainer>
          <Square coin={selected} index={0} inSearch={true} edit={function(){}} />
        </SquareContainer>
      </SearchSelectAsset>
    )
  }
}

export const SearchSelectJest = SearchSelect;

export default SearchSelect;
