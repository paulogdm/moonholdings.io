import React from 'react'

import { Square } from '../../components'
import { IAsset } from '../../shared/types'
import { NO_USD_EXCHANGES_FOUND } from '../../shared/constants/copy'
import { SearchSelectAsset, SquareContainer } from '../../styles'

interface IProps {
  selected: IAsset;
}

const NoExchanges = () => <h2>{ NO_USD_EXCHANGES_FOUND }</h2>;

export const SearchSelected = (props: IProps) => {
  return (
    <SearchSelectAsset>
      <NoExchanges/>
      <SquareContainer>
        <Square coin={props.selected} index={0} inSearch={true} edit={function(){}} />
      </SquareContainer>
    </SearchSelectAsset>
  )
}
