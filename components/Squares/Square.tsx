import React from 'react'

import { SquareRow } from '../../components'
import { IAsset } from '../../shared/types'
import { SquareShade, SquareInSearch, SquareShadeInSearch, CoinSquare, CoinRank, WatchlistSquare, WatchlistShade }
  from '../../styles'
import { setStyle, styleModifier, capitalizeFirstLetter as capFirst } from '../../shared/utils'

interface IProps {
  coin: IAsset;
  index: number;
  inSearch?: boolean;
  watchlist?: boolean;
  edit(toggle: boolean, coin: IAsset): void;
}

export default class Square extends React.PureComponent<IProps> {
  public render() {
    const { coin, edit, index, inSearch, watchlist } = this.props;
    const { currency, exchange, position, percentage, price, marketCap, value } = coin;
    // Update shade style based on <Search/> or <Board/> contex.
    const SquareStyle =
      inSearch ? SquareInSearch :
      watchlist ? WatchlistSquare : CoinSquare;
    const Shade =
      inSearch ? SquareShadeInSearch :
      watchlist ? WatchlistShade : SquareShade;
    const exchangeName = exchange !== '' ? capFirst(exchange) : 'Aggregate';
    const displayRank = !watchlist && !inSearch;

    return (
      <div
        className={watchlist ? '' : styleModifier(coin.currency)}
        style={watchlist ? {} : setStyle(coin.currency) }
        onClick={() => edit(true, coin)}
      >
        <SquareStyle className="coin-square">
          <Shade>
            <CoinRank>
              <span><h1>{currency}</h1></span>
              { displayRank && <span><h4>#{index + 1}</h4></span> }
            </CoinRank>
            { price && <SquareRow type={'Price:'} data={price}/> }
            { inSearch && <SquareRow type={'Marketcap:'} data={marketCap}/> }
            { exchangeName && <SquareRow type={'Exchange:'} data={exchangeName}/> }
            { position && <SquareRow type={'Position:'} data={position}/> }
            { percentage && <SquareRow type={'Allocation:'} data={percentage}/> }
            { value && <SquareRow type={'Value:'} data={value}/> }
            { watchlist && <SquareRow type={'Marketcap:'} data={marketCap}/> }
          </Shade>
        </SquareStyle>
      </div>
    );
  }
}
