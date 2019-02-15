import React from 'react'

import Square from '../Square/Square'
import { IPortfolioItem } from '../../shared/types'
import { PortfolioBalance, PortfolioContainer } from '../../styles'

import {
  portfolioBalance,
  // calculateBalance
} from '../../shared/utils/math';

interface IProps {
  coins: IPortfolioItem[];
  edit(toggle: boolean, coin: IPortfolioItem): void;
}

// const Portfolio = ({ coins: IPortfolioItem, edit }) => (
// const Portfolio = (coins: IPortfolioItem[], edit => {
//   console.log('props, props')
//   return (
//     <div>
//       {/* <section className="portfolio-balance">
//         ${portfolioBalance(coins)}
//       </section>
//       <div className="flex-grid portfolio-container">
//         {coins.map((coin, i) =>
//           (<Square key={coin.currency} coin={coin} edit={edit} index={i} />))}
//       </div> */}
//     </div>
//   );
// }

export default class Portfolio extends React.PureComponent<IProps> {
  public render() {
    const { coins, edit } = this.props;

    return (
      <div>
        <PortfolioBalance>
          ${portfolioBalance(coins)}
        </PortfolioBalance>
        <PortfolioContainer>
          {coins.map((coin, i) =>
            (<Square key={coin.symbol} coin={coin} edit={edit} index={i} />))}
        </PortfolioContainer>
      </div>
    );
  }
}
