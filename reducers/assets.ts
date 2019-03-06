import * as R from 'ramda'

import { Actions } from '../actions/assets'
import { calculatePercentage, jsonFormatFromObject, remapUpdatedPortfolio, updateWatchlist }
  from '../services/coinFactory'
import { IinitialAssetsState as IInitState, IAsset, IMarketAsset } from '../shared/types'
import { MOON_PORTFOLIO, MOON_WATCHLIST } from '../shared/constants/copy'

export const defaultAssetsState: IInitState = {
  assets: [],
  portfolio: [],
  watchlist: [],
  exchanges: [],
  loading: true,
  fetchingMarkets: false
};

interface IAction {
  type: string;
  coin: IAsset;
  assets: IAsset[];
  watchlist: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  fetchingMarkets: boolean;
}

// let updatedPortfolio = [];
let updatedWatchlist = [];

export const AssetsReducer = (state = defaultAssetsState, action: IAction): IInitState => {
  switch (action.type) {
    case Actions.GET_ALL_ASSETS: {
      const { loading } = action;
      return { ...state, loading };
    }

    case Actions.SET_ALL_ASSETS: {
      const { assets, loading } = action;
      return { ...state, assets, loading };
    }

    case Actions.GET_MARKET_PRICES: {
      const { fetchingMarkets } = action;
      return { ...state, fetchingMarkets };
    }

    case Actions.SET_MARKET_PRICES: {
      const { exchanges, fetchingMarkets } = action;
      return { ...state, exchanges, fetchingMarkets };
    }

    case Actions.ADD_COINS_PORTFOLIO:
      const { assets } = action;
      return { ...state, portfolio: assets };

    case Actions.ADD_COIN_PORTFOLIO:
      const { coin } = action;
      const { portfolio } = state;
      const portfolioAddedCoin = calculatePercentage(Actions.ADD_COIN_PORTFOLIO, portfolio, coin);
      localStorage.setItem(MOON_PORTFOLIO, jsonFormatFromObject(portfolioAddedCoin));
      return { ...state, portfolio: portfolioAddedCoin };

    case Actions.ADD_COIN_WATCHLIST:
      const { watchlist } = state;
      updatedWatchlist = updateWatchlist(action.coin, watchlist);
      localStorage.setItem(MOON_WATCHLIST, jsonFormatFromObject(updatedWatchlist));
      return { ...state, watchlist: updatedWatchlist };

    case Actions.ADD_COINS_WATCHLIST:
      const { watchlist: savedWatchlist  } = action;
      return { ...state, watchlist: savedWatchlist };

    case Actions.UPDATE_COIN_PORTFOLIO:
      const updatedCoin = action.coin;
      const { portfolio: portfolioToUpdate } = state;
      const remappedPortfolio = remapUpdatedPortfolio(portfolioToUpdate, updatedCoin);
      const finalPortfolio = calculatePercentage(Actions.UPDATE_COIN_PORTFOLIO, remappedPortfolio);

      localStorage.setItem(MOON_PORTFOLIO, JSON.stringify(finalPortfolio));

      return {
        ...state,
        portfolio: finalPortfolio
      };

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

    default:
      return state;
  }
};
