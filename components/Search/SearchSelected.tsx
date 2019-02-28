import React from 'react'

import { Square } from '../../components'
import { IAsset } from '../../shared/types'
import { SearchSelectAsset, SquareContainer } from '../../styles'

interface IProps {
  selected: IAsset;
  aggregate: boolean;
}

const NoExchanges = () =>
  <h2>No USD, USDC or USDT paired based exchanges found, using aggregate exchange data.</h2>;

const AggregateSelected = () =>
  <h2>You have selected to use aggregate exchange price data.</h2>;

export const SearchSelected = (props: IProps) => {
  const { aggregate } = props;
  return (
    <SearchSelectAsset>
      { aggregate ? <AggregateSelected/> : <NoExchanges/> }
      <SquareContainer>
        <Square coin={props.selected} index={0} inSearch={true} edit={function(){}} />
      </SquareContainer>
    </SearchSelectAsset>
  )
}
