import React from 'react'
import { bind } from 'decko'

import { IAsset } from '../../shared/types'
import { numberWithCommas, round } from '../../shared/utils/math'
import {
  SquareShade, SquareInSearch, SquareShadeInSearch,
  CoinSquare, CoinRank, CoinStat
} from '../../styles'
import { setStyle, styleModifier } from '../../shared/utils/modifiers'
import { sortByValue } from '../../services/coinFactory';

interface IProps {
  coin: IAsset;
  index: number;
  inSearch?: boolean;
  edit(toggle: boolean, coin: IAsset): void;
}

export default class Square extends React.PureComponent<IProps> {
  public render() {
    const { coin, edit, index, inSearch } = this.props;
    const { currency, position, percentage, price, marketCap, value } = coin;

    const SquareStyle = !inSearch ? CoinSquare : SquareInSearch;
    const Shade = !inSearch ? SquareShade : SquareShadeInSearch;

    return (
      <div
        className={styleModifier(coin.currency)}
        style={setStyle(coin.currency)}
        onClick={() => edit(true, coin)}
      >
        <SquareStyle className="coin-square">
          <Shade>
            <CoinRank>
              <span><h1>{currency}</h1></span>
              { !inSearch && <span><h4>#{index + 1}</h4></span> }
            </CoinRank>
            { price && this.renderRow('Price:', price) }
            { inSearch && this.renderRow('Marketcap:', marketCap) }
            { inSearch && this.renderRow('Exchange:', 'Aggregate data') }
            { position && this.renderRow('Position:', position) }
            { percentage && this.renderRow('Allocation:', percentage) }
            { value && this.renderRow('Value:', value)}
          </Shade>
        </SquareStyle>
      </div>
    );
  }

  @bind
  private renderRow(type: string, value: number | string) {
    const isPrice = type === 'Price:';
    const priceUSD = Number(value) > 1 ? round(Number(value)) : value;
    const isLargeNumber = type === 'Marketcap:' || type === 'Value:';
    const isExchangeRow = type === 'Exchange:';
    const isPosition = type === 'Position:';
    const isAllocation = type === 'Allocation:';
    const largeNumber = (num: number) => <p>${numberWithCommas(num)}</p>;

    return (
      <CoinStat>
        <p><em>{type}</em></p>
        {isPrice && <p>${priceUSD}</p>}
        {isLargeNumber && largeNumber(Number(value))}
        {isExchangeRow && <p>{value}</p>}
        {isPosition && <p>{value}</p>}
        {isAllocation && <p>{value}%</p>}
      </CoinStat>
    )
  }
}
