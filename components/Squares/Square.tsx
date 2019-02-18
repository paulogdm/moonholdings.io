import React from 'react'

import { IAsset } from '../../shared/types'
import { numberWithCommas, round } from '../../shared/utils/math'
import { SquareShade, CoinSquare, CoinRank, CoinStat } from '../../styles'

import {
  setStyle,
  styleModifier
} from '../../shared/utils/modifiers'

interface IProps {
  coin: IAsset;
  index: number;
  edit(toggle: boolean, coin: IAsset): void;
}

export default class Portfolio extends React.PureComponent<IProps> {
  public render() {
    const { coin, edit, index } = this.props;
    const { position, price, symbol } = coin;

    return (
      <div
        className={styleModifier(coin.symbol)}
        style={setStyle(coin.symbol)}
        onClick={() => edit(true, coin)}
      >
        <CoinSquare className="coin-square">
          <SquareShade>
            <CoinRank>
              <span><h1>{symbol}</h1></span>
              <span><h4>#{index + 1}</h4></span>
            </CoinRank>
            <CoinStat>
              <p><em>Price:</em></p>
              <p>${price ? round(Number(price)) : 0}</p>
            </CoinStat>
            <CoinStat>
              <p><em>Position:</em></p>
              <p>{position}</p>
            </CoinStat>
            <CoinStat>
              <p><em>Allocation:</em></p>
              <p>{coin.percentage}%</p>
            </CoinStat>
            <CoinStat>
              <p><em>Value:</em></p>
              <p>${numberWithCommas(coin.value)}</p>
            </CoinStat>
          </SquareShade>
        </CoinSquare>
      </div>
    );
  }
}
