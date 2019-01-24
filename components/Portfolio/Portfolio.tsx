import React from 'react';

import Square from '../../components/Squares/square';
import { IPortfolioItem } from '../../shared/types';

// Utils
import {
  portfolioBalance,
  // calculateBalance
} from '../../utils/math';

// const byLargestBalance = (a, b) => calculateBalance(b) - calculateBalance(a);

const Portfolio = ({ coins: IPortfolioItem, edit }) => (
  <div>
    <section className="portfolio-balance">
      ${portfolioBalance(coins)}
    </section>
    <div className="flex-grid portfolio-container">
      {coins.map((coin, i) =>
        (<Square key={coin.currency} coin={coin} edit={edit} index={i} />))}
      {/* {coins.sort(byLargestBalance).map((coin, i) =>
        (<Square key={coin.currency} coin={coin} edit={edit} index={i} />))} */}
    </div>
  </div>
);

export default Portfolio;
