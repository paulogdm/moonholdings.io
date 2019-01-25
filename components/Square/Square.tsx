import React from 'react';

import { IPortfolioItem } from '../../shared/types';
import { numberWithCommas, round } from '../../shared/utils/math';
// import {
//   setStyle,
//   styleModifier
// } from '../../utils/modifiers';

interface IProps {
  coin: IPortfolioItem;
  index: number;
  edit(): void;
}

export default class Portfolio extends React.PureComponent<IProps> {
  public render() {
    const { coin, index } = this.props;
    const { balance, price, symbol } = coin;

    return (
      // <div
      //   className={styleModifier(coin.currency)}
      //   style={setStyle(coin.currency)}
      //   onClick={() => clicked(coin, edit)}
      // >
      <div>
        <section className="square-shade">
          <div className="coin-stats">
            <div className="coin-index">
              <span className="stat">#</span>
              <span>{index + 1}</span>
            </div>
          </div>
          <h1>
            <div className="fl">{symbol}</div>
          </h1>
          <p className="coin-stat"><span className="mr3 o7">Price:</span>
            <span className="fr">${price ? round(Number(price)) : 0}</span>
          </p>
          <p className="coin-stat"><span className="mr3 o7">Position:</span>
            <span className="fr">{balance}</span>
          </p>
          <p className="coin-stat"><span className="mr3 o7">Allocation:</span>
            <span className="fr">
              <span className="coin-percentage">
                <span>{coin.percentage}</span>
                <span className="stat">%</span>
              </span>
            </span>
          </p>
          <p className="coin-stat"><span className="mr3 o7">Value:</span>
            <span className="fr f20">${numberWithCommas(coin.value)}</span>
          </p>
        </section>
      </div>
    );
  }
}
