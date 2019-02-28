import React from 'react'
import * as R from 'ramda'

import { BlockLoader, SearchSelected, SearchExchanges } from '../../components'
import { IAsset, IMarketAsset } from '../../shared/types'
import { SearchSelectLoader } from '../../styles'

interface IProps {
  assets: IAsset[];
  selected: IAsset;
  exchanges: IMarketAsset[]; 
  aggregate: boolean;
  exchange: string;
  fetching: boolean;
  enterPosition(event: React.FormEvent<HTMLInputElement>): void;
  checkAggregate(event: React.FormEvent<HTMLInputElement>): void;
  exchangeSelect(market: IMarketAsset): void;
}

class SearchSelect extends React.Component<IProps> {
  render() {
    const { selected, exchanges, exchange, aggregate, checkAggregate, fetching } = this.props;

    const exchangesExist = R.not(R.isEmpty(exchanges));
    const Loading = () => <SearchSelectLoader><BlockLoader/></SearchSelectLoader>;

    return (
      <div>
        { fetching
          ? <Loading />
          : exchangesExist && !aggregate
            // Display list of supported exchanges
            ? <SearchExchanges
                selected={selected}
                exchange={exchange}
                exchanges={exchanges}
                checkAggregate={checkAggregate}
                aggregate={aggregate}
                enterPosition={this.props.enterPosition}
                exchangeSelect={this.props.exchangeSelect}
              />
            // If there are no exchanges, display asset with aggregate price data
            : <SearchSelected selected={selected} aggregate={aggregate} /> }
      </div>
    );
  }
}

export const SearchSelectJest = SearchSelect;

export default SearchSelect;
