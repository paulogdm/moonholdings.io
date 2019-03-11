import { getPrices, getAvailableSupply, getMarkets } from '../services/api'
import { fetchAll, combineExchangeData, formatAssets, formatCoinsList } from '../services/coinFactory'
import { extractExchangePrice, isNotAggregate } from '../services/exchangeFilters'
import {
  IAsset, DispatchAllAssets, DispatchMarketPrices, DispatchAddCoin, DispatchAddCoins, DispatchUpdateCoin,
  IWatchlistAsset, DispatchAddCoinWatch, DispatchAddCoinsWatch, DispatchRemoveCoin, DispatchRemoveWatch
} from '../shared/types'
import { MOON_PORTFOLIO, MOON_WATCHLIST } from '../shared/constants/copy'

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

// Fetch assets from Nomics API V1.
export const fetchAllAssets = () => (dispatch: DispatchAllAssets) => {
  dispatch(actionGetAllAssets());
  return fetchAll([getPrices(), getAvailableSupply()]).then((responses) =>
    dispatch(actionSetAllAssets(formatAssets(responses))));
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

// Rebuild Portfolio form localStorage.
export const addCoinsPortfolio = (assets: IAsset[]) => (dispatch: DispatchAddCoins) => {
  // If any asset has a selected exchange, get exchange price for that asset:
  const assetsWithExchange = assets.filter((asset) => isNotAggregate(asset.exchange));
  console.log('assetsWithExchange', assetsWithExchange);

  if (assetsWithExchange.length > 0) {
    dispatch(actionFetchMarkets());
    return getMarkets().then((res) => {
      if (res) {
        const assetsUpdatedPrices = assetsWithExchange.map((asset) => extractExchangePrice(asset, res));
        dispatch(actionAddCoinsPortfolio(assetsUpdatedPrices));
      }
      else {
        console.error(`addCoinsPortfolio > getPrices request error: ${res}`);
      }
    });
  }

  // If all exchanges are aggregate:
  return getPrices().then((res) => {
    if (res && res.status === 200) {
      const portfolioAssets = formatCoinsList(MOON_PORTFOLIO, assets, res.data);
      dispatch(actionAddCoinsPortfolio(portfolioAssets));
    }
    else {
      console.error(`addCoinsPortfolio > getPrices request error: ${res}`);
    }
  });
}

// Rebuild Watchlist form localStorage.
export const addCoinsWatchlist = (coins: IAsset[]) => (dispatch: DispatchAddCoinsWatch) => {
  return getPrices().then((res) => {
    if (res && res.status === 200) {
      const watchlistAssets = formatCoinsList(MOON_WATCHLIST, coins, res.data);
      dispatch(actionAddCoinsWatchlist(watchlistAssets));
    }
    else {
      console.error(`addCoinsWatchlist > getPrices request error: ${res}`);
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
