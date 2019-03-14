import React from 'react'
import * as R from 'ramda'

import { SquareRow } from '../../components'
import { IAsset } from '../../shared/types'
import { SquareShade, SquareInSearch, SquareShadeInSearch, CoinSquare, CoinRank, WatchlistSquare, WatchlistShade }
  from '../../styles'
import { colorBlack } from '../../shared/models/squares'
import { setStyle, styleModifier, capitalizeFirstLetter as capFirst, roundFloat } from '../../shared/utils'

interface IProps {
  coin: IAsset;
  index: number;
  inSearch?: boolean;
  watchlist?: boolean;
  edit(toggle: boolean, coin: IAsset, editWatchlist: boolean): void;
}

export default class Square extends React.PureComponent<IProps> {
  public render() {
    const { coin, edit, index, inSearch, watchlist } = this.props;
    const { currency, exchange, position, percentage, price, marketCap, value } = coin;

    const SquareStyle =
      inSearch ? SquareInSearch :
      watchlist ? WatchlistSquare : CoinSquare;
    const Shade =
      inSearch ? SquareShadeInSearch :
      watchlist ? WatchlistShade : SquareShade;

    const exchangeName = !R.isEmpty(exchange) ? capFirst(exchange) : 'Aggregate';
    const displayRank = !watchlist && !inSearch;
    const rank = index + 1;
    const allocation = percentage ? percentage : 0;
    const numberValue = Number(value);
    const formattedValue = numberValue > 0.01 ? roundFloat(numberValue, 2) : numberValue;
    const editWatchlist = !!watchlist;
    const CurrencySymbol = () => <span><h1>{currency}</h1></span>;
    const CurrencyRank = () => <span><h4>#{rank}</h4></span>;

    return (
      <div
        className={watchlist ? '' : styleModifier(coin.currency)}
        style={watchlist ? colorBlack : setStyle(coin.currency)}
        onClick={() => edit(true, coin, editWatchlist)}
      >
        <SquareStyle className="coin-square">
          <Shade>
            <CoinRank>
              <CurrencySymbol/>
              { displayRank && <CurrencyRank/> }
            </CoinRank>
            { price && <SquareRow type={'Price:'} data={price}/> }
            { inSearch && <SquareRow type={'Marketcap:'} data={marketCap}/> }
            { exchangeName && <SquareRow type={'Exchange:'} data={exchangeName}/> }
            { position && <SquareRow type={'Position:'} data={position}/> }
            { !watchlist && <SquareRow type={'Allocation:'} data={allocation}/> }
            { value && <SquareRow type={'Value:'} data={formattedValue}/> }
            { watchlist && <SquareRow type={'Marketcap:'} data={marketCap}/> }
          </Shade>
        </SquareStyle>
      </div>
    );
  }
}
