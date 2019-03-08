import React from 'react'

import { CoinRow } from '../../styles'
import { nFormatter, numberWithCommas, formatPrice, roundFloat } from '../../shared/utils/math'

interface IProps {
  type: string;
  data: number | string;
  isWatchlist?: boolean;
}

export const SquareRow = (props: IProps) => {
  const { type, data, isWatchlist } = props;
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
    if (isLargeNumber) return '$' + numberWithCommas(Math.round(Number(num)));
  };

  const smallNumber = `$${nFormatter(Number(data), 1)}`;
   
  return (
    <CoinRow title={displayTitle(isLargeNumber, data)}>
      <RowKey/>
      { isPrice && <p>${priceUSD}</p> }
      { showMarketcap && <p>{ isWatchlist ? `$${numberWithCommas(Math.round(Number(data)))}`: smallNumber }</p> }
      { showValue && <p>{ `$${numberWithCommas(Number(data))}` }</p> }
      { isExchangeRow && <p>{ data }</p> }
      { isPosition && <p>{ data }</p> }
      { isAllocation && <p>{ roundFloat(Number(data), 2) }%</p> }
    </CoinRow>
  );
}
