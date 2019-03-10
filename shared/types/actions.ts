import { IAsset, IMarketAsset, IWatchlistAsset } from '../../shared/types'

export interface IActions {
  LOADING_TRUE: string;
  GET_ALL_ASSETS: string;
  SET_ALL_ASSETS: string;
  GET_MARKET_PRICES: string;
  SET_MARKET_PRICES: string;
  ADD_COIN_PORTFOLIO: string;
  ADD_COINS_PORTFOLIO: string;
  UPDATE_COIN_PORTFOLIO: string;
  REMOVE_COIN_PORTFOLIO: string;
  ADD_COIN_WATCHLIST: string;
  ADD_COINS_WATCHLIST: string;
  REMOVE_COIN_WATCHLIST: string;
}

export interface IAllAssets {
  type: IActions['GET_ALL_ASSETS'];
  assets?: IAsset[];
  loading: boolean;
}

export interface ISetMarket {
  type: IActions['SET_MARKET_PRICES'];
  exchanges?: IMarketAsset[];
  fetchingMarkets: boolean;
}

export interface ICoinsPortfolio {
  type: IActions['ADD_COINS_PORTFOLIO'] | IActions['LOADING_TRUE'];
  assets?: IAsset[];
  loading: boolean;
}

export interface ICoinPortfolio {
  type: IActions['ADD_COIN_PORTFOLIO'];
  coin: IAsset;
}

export interface IRemoveCoinPortfolio {
  type: IActions['REMOVE_COIN_PORTFOLIO'];
  coin: IAsset;
}

export interface IUpdateCoinPortfolio {
  type: IActions['UPDATE_COIN_PORTFOLIO'];
  coin: IAsset;
}

export interface ICoinWatchlist {
  type: IActions['ADD_COIN_WATCHLIST'];
  coin: IWatchlistAsset;
}

export interface ICoinsWatchlist {
  type: IActions['ADD_COINS_WATCHLIST'];
  watchlist: IWatchlistAsset[];
}

export interface IRemoveWatch {
  type: IActions['REMOVE_COIN_WATCHLIST'];
  coin: IWatchlistAsset;
}

export type DispatchAllAssets = (arg: IAllAssets) => (IAllAssets);

export type DispatchMarketPrices = (arg: ISetMarket) => (ISetMarket);

export type DispatchAddCoin = (arg: ICoinPortfolio) => (ICoinPortfolio);

export type DispatchAddCoins = (arg: ICoinsPortfolio) => (ICoinsPortfolio);

export type DispatchUpdateCoin = (arg: IUpdateCoinPortfolio) => (IUpdateCoinPortfolio);

export type DispatchRemoveCoin = (arg: IRemoveCoinPortfolio) => (IRemoveCoinPortfolio);

export type DispatchAddCoinWatch = (arg: ICoinWatchlist) => (ICoinWatchlist);

export type DispatchAddCoinsWatch = (arg: ICoinsWatchlist) => (ICoinsWatchlist);

export type DispatchRemoveWatch = (arg: IRemoveWatch) => (IRemoveWatch);
