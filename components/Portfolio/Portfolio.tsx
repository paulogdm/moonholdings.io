import React from 'react'

import { Square } from '../../components'
import { IAsset } from '../../shared/types'
import { PortfolioBalance, PortfolioContainer } from '../../styles'
import { calculateBalance } from '../../shared/utils/math';

interface IProps {
  coins: IAsset[];
  edit(toggle: boolean, coin: IAsset): void;
}

export default class Portfolio extends React.PureComponent<IProps> {
  public render() {
    const { coins, edit } = this.props;
    return (
      <div>
        <PortfolioBalance>
          ${calculateBalance(coins)}
        </PortfolioBalance>
        <PortfolioContainer>
          {coins.map((coin, i) =>
            (<Square key={coin.currency} coin={coin} edit={edit} index={i} />))}
        </PortfolioContainer>
      </div>
    );
  }
}
