import React from 'react'

import { CoinRow } from '../../styles'
import { nFormatter, numberWithCommas, formatPrice } from '../../shared/utils/math'

interface IProps {
  type: string;
  data: number | string;
}

export const SquareRow = (props: IProps) => {
  const { type, data } = props;
  const isPrice = type === 'Price:';
  const priceUSD = data && formatPrice(data);
  const isLargeNumber = type === 'Marketcap:' || type === 'Value:';
  const isExchangeRow = type === 'Exchange:';
  const isPosition = type === 'Position:';
  const isAllocation = type === 'Allocation:';
  const showMarketcap = type === 'Marketcap:';
  const showValue = type === 'Value:';
  const RowKey = () => <p><em>{type}</em></p>;

  const displayTitle = (isLargeNumber: boolean, num: string | number) => {
    if (isLargeNumber) {
      return '$' + numberWithCommas(Math.round(Number(num)));
    }
  }

  return (
    <CoinRow title={displayTitle(isLargeNumber, data)}>
      <RowKey/>
      {isPrice && <p>${priceUSD}</p>}
      {showMarketcap && `$${nFormatter(Number(data), 1)}`}
      {showValue && `$${numberWithCommas(Number(data))}`}
      {isExchangeRow && <p>{data}</p>}
      {isPosition && <p>{data}</p>}
      {isAllocation && <p>{data}%</p>}
    </CoinRow>
  )
}
