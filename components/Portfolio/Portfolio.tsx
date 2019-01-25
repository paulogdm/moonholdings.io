import React from 'react';

import Square from '../Square/Square';
import { IPortfolioItem } from '../../shared/types';
import { portfolio } from '../../styles'

import {
  portfolioBalance,
  // calculateBalance
} from '../../shared/utils/math';

interface IProps {
  coins: IPortfolioItem[];
  edit(): void;
}

const { PortfolioBalance, PortfolioContainer } = portfolio;

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
          Portfolio goes here...
        </PortfolioContainer>
        {/* <div className="flex-grid portfolio-container">
          {coins.map((coin, i) =>
            (<Square key={coin.symbol} coin={coin} edit={edit} index={i} />))}
        </div> */}
      </div>
    );
  }
}
