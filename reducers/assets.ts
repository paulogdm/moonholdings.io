import { Actions } from '../actions/assets'
import { IinitialAssetsState, IAsset, IMarketAsset } from '../shared/types'

const defaultAssetsState:
  IinitialAssetsState = {
    assets: [],
    portfolio: [],
    exchanges: [],
    loading: false,
    fetchingMarkets: false
  };

interface IAssetsAction {
  type: string;
  assets: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  fetchingMarkets: boolean;
}

export const AssetsReducer = (state = defaultAssetsState, action: IAssetsAction): IinitialAssetsState => {
  switch (action.type) {
    case Actions.GET_ALL_ASSETS: {
      const { assets } = action;
      console.log('assets', assets);
      return {
        ...state,
        assets,
        loading: false
      };
    }

    case Actions.GET_MARKET_PRICES: {
      const { fetchingMarkets } = action;
      return {
        ...state,
        fetchingMarkets
      };
    }

    case Actions.SET_MARKET_PRICES: {
      const { exchanges, fetchingMarkets } = action;
      return {
        ...state,
        exchanges,
        fetchingMarkets
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
