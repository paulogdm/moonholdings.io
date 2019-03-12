import { Actions } from '../actions/assets'
import { calculatePercentage, jsonFormatFromObject, remapUpdatedPortfolio, updateWatchlist }
  from '../services/coinFactory'
import { IinitialAssetsState as IInitState, IAsset, IActionReducer } from '../shared/types'
import { MOON_PORTFOLIO, MOON_WATCHLIST } from '../shared/constants/copy'

export const defaultAssetsState: IInitState = {
  assets: [],
  portfolio: [],
  watchlist: [],
  exchanges: [],
  loading: true,
  fetchingMarkets: false,
  notification: '',
  notificationError: false
};

const loadingStatus = (loading: boolean, fetching: boolean) => fetching ? true : loading;

export const AssetsReducer = (state = defaultAssetsState, action: IActionReducer): IInitState => {
  switch (action.type) {
    case Actions.FETCH_MARKETS: {
      const { fetchingMarkets } = action;
      return { ...state, fetchingMarkets };
    }

    case Actions.GET_ALL_ASSETS: {
      const { loading } = action;
      return { ...state, loading };
    }

    case Actions.SET_ALL_ASSETS: {
      const { assets, loading } = action;
      const finishLoading = loadingStatus(loading, state.fetchingMarkets);
      return { ...state, assets, loading: finishLoading };
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
      const { assets, loading, fetchingMarkets } = action;
      return { ...state, portfolio: assets, loading, fetchingMarkets };

    case Actions.ADD_COIN_PORTFOLIO:
      const { coin } = action;
      const { portfolio } = state;
      const portfolioAddedCoin = calculatePercentage(Actions.ADD_COIN_PORTFOLIO, portfolio, coin);
      localStorage.setItem(MOON_PORTFOLIO, jsonFormatFromObject(portfolioAddedCoin));
      return { ...state, portfolio: portfolioAddedCoin };

    case Actions.ADD_COIN_WATCHLIST:
      const { watchlist } = state;
      const updatedWatchlist = updateWatchlist(action.coin, watchlist);
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
      return { ...state, portfolio: finalPortfolio };

    case Actions.REMOVE_COIN_PORTFOLIO:
      const filteredPortfolio = state.portfolio.filter(c => c !== action.coin);
      let smallerPortfolio: IAsset[] = [];

      if (filteredPortfolio.length > 0) {
        smallerPortfolio = calculatePercentage(Actions.REMOVE_COIN_PORTFOLIO, filteredPortfolio);
        localStorage.setItem(MOON_PORTFOLIO, JSON.stringify(smallerPortfolio));
      } else {
        smallerPortfolio = [];
        localStorage.setItem(MOON_PORTFOLIO, '');
      }

      return { ...state, portfolio: smallerPortfolio };

    case Actions.REMOVE_COIN_WATCHLIST:
      let smallerWatchlist = state.watchlist.filter(c => c !== action.coin);

      if (smallerWatchlist.length > 0) {
        localStorage.setItem(MOON_WATCHLIST, JSON.stringify(smallerWatchlist));
      } else {
        smallerWatchlist = [];
        localStorage.setItem(MOON_WATCHLIST, '');
      }

      return { ...state, watchlist: smallerWatchlist };

    case Actions.SET_NOTIFICATION: {
        const { notification, notificationError } = action;
        return { ...state, notification, notificationError };
      }

    default:
      return state;
  }
};
