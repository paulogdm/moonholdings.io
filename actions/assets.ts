import * as R from 'ramda'

import { getPricesRequest, getAvailableSupply, getMarkets } from '../services/api'
import { fetchAll, combineExchangeData, formatAssets, formatCoinsList } from '../services/coinFactory'
import { extractExchangePrice, isNotAggregate } from '../services/exchangeFilters'
import {
  IAsset, DispatchAllAssets, DispatchMarketPrices, DispatchAddCoin, DispatchAddCoins, DispatchUpdateCoin,
  IWatchlistAsset, DispatchAddCoinWatch, DispatchAddCoinsWatch, DispatchRemoveCoin, DispatchRemoveWatch
} from '../shared/types'
import { isError, noArrayResponseErrors } from '../shared/utils'
import { MOON_PORTFOLIO, MOON_WATCHLIST } from '../shared/constants/copy'
import { ERROR_API_ALL_ASSETS, ERROR_API_PRICES, ERROR_API_MARKETS, ERROR_API_AVAILABLE_SUPPLY }
  from '../shared/constants/errors'

// ACTION TYPES
export const Actions = {
  FETCH_MARKETS: 'FETCH_MARKETS',
  GET_ALL_ASSETS: 'GET_ALL_ASSETS',
  SET_ALL_ASSETS: 'SET_ALL_ASSETS',
  GET_MARKET_PRICES: 'GET_MARKET_PRICES',
  SET_MARKET_PRICES: 'SET_MARKET_PRICES',
  ADD_COIN_PORTFOLIO: 'ADD_COIN_PORTFOLIO',
  ADD_COINS_PORTFOLIO: 'ADD_COINS_PORTFOLIO',
  UPDATE_COIN_PORTFOLIO: 'UPDATE_COIN_PORTFOLIO',
  REMOVE_COIN_PORTFOLIO: 'REMOVE_COIN_PORTFOLIO',
  ADD_COIN_WATCHLIST: 'ADD_COIN_WATCHLIST',
  ADD_COINS_WATCHLIST: 'ADD_COINS_WATCHLIST',
  REMOVE_COIN_WATCHLIST: 'REMOVE_COIN_WATCHLIST',
  SET_NOTIFICATION: 'SET_NOTIFICATION'
};

// ACTION CREATORS
const actionFetchMarkets = () =>
  ({ type: Actions.FETCH_MARKETS, fetchingMarkets: true });

const actionGetAllAssets = () =>
  ({ type: Actions.GET_ALL_ASSETS, loading: true });

const actionSetAllAssets = (data: any) =>
  ({ type: Actions.SET_ALL_ASSETS, assets: data, loading: false });

const actionGetMarketPrices =
  ({ type: Actions.GET_MARKET_PRICES, fetchingMarkets: true });

const actionSetMarketPrices = (data: any) =>
  ({ type: Actions.SET_MARKET_PRICES, exchanges: data, fetchingMarkets: false });

const actionAddCoinPortfolio = (coin: IAsset) =>
  ({ type: Actions.ADD_COIN_PORTFOLIO, coin });

const actionAddCoinsPortfolio = (coins: IAsset[]) =>
  ({ type: Actions.ADD_COINS_PORTFOLIO, assets: coins, loading: false, fetchingMarkets: false });

const updateCoinInPortfolio = (coin: IAsset) =>
  ({ type: Actions.UPDATE_COIN_PORTFOLIO, coin });

const removeCoinInPortfolio = (coin: IAsset) =>
  ({ type: Actions.REMOVE_COIN_PORTFOLIO, coin });

const actionAddCoinWatchlist = (coin: IWatchlistAsset) =>
  ({ type: Actions.ADD_COIN_WATCHLIST, coin });

const actionAddCoinsWatchlist = (watchlist: IWatchlistAsset[]) =>
  ({ type: Actions.ADD_COINS_WATCHLIST, watchlist });

const removeCoinInWatchlist = (coin: IAsset) =>
  ({ type: Actions.REMOVE_COIN_WATCHLIST, coin });

const actionSetNotification = (notification: string, notificationError: boolean) =>
  ({ type: Actions.SET_NOTIFICATION, notification, notificationError });

// Fetch assets from Nomics API V1.
export const fetchAllAssets = () => (dispatch: DispatchAllAssets) => {
  dispatch(actionGetAllAssets());
  return fetchAll([getPricesRequest(), getAvailableSupply()]).then((responses) => {
    const getPricesResponse = responses[0];
    const getAvailableSupplyResponse = responses[1];

    if (noArrayResponseErrors(responses)) {
      return dispatch(actionSetAllAssets(formatAssets(responses)));
    }
    else if (isError(getPricesResponse)) {
      return dispatch(actionSetNotification(ERROR_API_PRICES, true));
    }
    else if (isError(getAvailableSupplyResponse)) {
      return dispatch(actionSetNotification(ERROR_API_AVAILABLE_SUPPLY, true));
    }
    else {
      return dispatch(actionSetNotification(ERROR_API_ALL_ASSETS, true));
    }
  });
}

// Fetch USD, USDC & USDT markets to filter out Exchange List.
export const fetchMarketPrices = (asset: string) => (dispatch: DispatchMarketPrices) => {
  dispatch(actionGetMarketPrices);
  return getMarkets().then((res) => {
    if (res) {
      const exchangesForAsset = combineExchangeData(asset, res);
      return dispatch(actionSetMarketPrices(exchangesForAsset));
    }
    else {
      return dispatch(actionSetMarketPrices([]));
    }
  });
}

const fetchPrices = (
  assets: IAsset[],
  dispatch: any,
  assetsUpdatedPrices?: IAsset[],
  assetsAggregate?: IAsset[]
) => {
  return getPricesRequest().then((res) => {
    if (res && res.status === 200) {

      if (assetsAggregate && assetsUpdatedPrices) {
        const aggregateAssets = formatCoinsList(MOON_PORTFOLIO, assetsAggregate, res.data);
        const combinedAssets = R.concat(assetsUpdatedPrices, aggregateAssets);
        // Set portfolio then loading and fetchingMarkets to false.
        return dispatch(actionAddCoinsPortfolio(combinedAssets));
      }

      const portfolioAssets = formatCoinsList(MOON_PORTFOLIO, assets, res.data);
      return dispatch(actionAddCoinsPortfolio(portfolioAssets));
    }
    else {
      return dispatch(actionSetNotification(ERROR_API_PRICES, true));
    }
  });
}

// Rebuild Portfolio form localStorage.
export const addCoinsPortfolio = (assets: IAsset[]) => (dispatch: DispatchAddCoins) => {
  const assetsExchange = assets.filter((asset) => isNotAggregate(asset.exchange));
  const assetsAggregate = assets.filter((asset) => !isNotAggregate(asset.exchange));

  // If some or all exchanges are specified.
  if (assetsExchange.length > 0) {
    // Set fetchingMarkets to true.
    dispatch(actionFetchMarkets());

    return getMarkets().then((res) => {
      if (res) {
        const assetsUpdatedPrices = assetsExchange.map((asset) => extractExchangePrice(asset, res));

        if (assetsAggregate.length > 0) {
          return fetchPrices(assets, dispatch, assetsAggregate);
        }
        else {
          return dispatch(actionAddCoinsPortfolio(assetsUpdatedPrices));
        }
      }
      else {
        return dispatch(actionSetNotification(ERROR_API_MARKETS, true));
      }
    });
  }

  // All assets exchanges are set to aggregate.
  return fetchPrices(assets, dispatch);
}

// Rebuild Watchlist form localStorage.
export const addCoinsWatchlist = (coins: IAsset[]) => (dispatch: DispatchAddCoinsWatch) => {
  return getPricesRequest().then((res) => {
    if (res && res.status === 200) {
      const watchlistAssets = formatCoinsList(MOON_WATCHLIST, coins, res.data);
      dispatch(actionAddCoinsWatchlist(watchlistAssets));
    }
    else {
      return dispatch(actionSetNotification(ERROR_API_PRICES, true));
    }
  });
}

// Add a coin to portfolio.
export const addCoinPortfolio = (coin: IAsset) => (dispatch: DispatchAddCoin) => {
  dispatch(actionAddCoinPortfolio(coin));
}

export const addCoinWatchlist = (coin: IWatchlistAsset) => (dispatch: DispatchAddCoinWatch) => {
  dispatch(actionAddCoinWatchlist(coin));
}

// Update a coin in portfolio.
export const updateCoinPortfolio = (coin: IAsset) => (dispatch: DispatchUpdateCoin) => {
  dispatch(updateCoinInPortfolio(coin));
}

// Remove coin from portfolio.
export const removeCoinPortfolio = (coin: IAsset) => (dispatch: DispatchRemoveCoin) => {
  dispatch(removeCoinInPortfolio(coin));
}

// Remove coin from watchlist.
export const removeCoinWatchlist = (coin: IAsset) => (dispatch: DispatchRemoveWatch) => {
  dispatch(removeCoinInWatchlist(coin));
}
