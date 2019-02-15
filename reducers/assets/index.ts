import { Actions } from '../../actions/assets'
import { defaultInitialState } from '../../store'

export default (state = defaultInitialState, action: any) => {
  switch (action.type) {
    case Actions.GET_PRICES_REQUEST: {
      const { assets } = action;
      return {
        ...state,
        assets,
        loading: false
      };
    }

    // Adds coins from localStorage
    // case Actions.ADD_COINS_PORTFOLIO:
    //   const { coins } = action;

    //   return {
    //     ...state,
    //     portfolio: coins
    //   };

    // case Actions.ADD_COIN_PORTFOLIO:
    //   const { coin } = action;
    //   const { portfolio } = state;
    //   const newPortfolio = calculatePercentage(portfolio, coin);
    //   const moonPortfolio = arrayToObject(newPortfolio);
    //   localStorage.setItem('moonPortfolio', JSON.stringify(moonPortfolio));

    //   return {
    //     ...state,
    //     portfolio: newPortfolio
    //   };

    // case Actions.REMOVE_COIN_PORTFOLIO:
    //   const filteredPortfolio = state.portfolio.filter(c => c !== action.coin);
    //   let lighterPortfolio;

    //   if (filteredPortfolio.length > 0) {
    //     lighterPortfolio = calculatePercentage(filteredPortfolio);
    //     localStorage.setItem('moonPortfolio', JSON.stringify(lighterPortfolio));
    //   } else {
    //     lighterPortfolio = [];
    //     localStorage.clear();
    //   }

    //   return {
    //     ...state,
    //     portfolio: lighterPortfolio
    //   };

    // case Actions.UPDATE_COIN_PORTFOLIO:
    //   const found = state.portfolio.find(c => c.currency === action.coin.currency);

    //   const mappedPortfolio = state.portfolio.map((c) => {
    //     if (c.currency === found.currency) {
    //       return Object.assign({}, found);
    //     }

    //     return c;
    //   });

    //   const updatedPortfolio = calculatePercentage(mappedPortfolio);

    //   localStorage.setItem('moonPortfolio', JSON.stringify(updatedPortfolio));

    //   return {
    //     ...state,
    //     portfolio: calculatePercentage(updatedPortfolio)
    //   };

    default:
      return state;
  }
};
