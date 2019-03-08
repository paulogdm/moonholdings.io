import { IAsset, IMarketAsset } from './assets'

export interface IinitialAssetsState {
  assets: IAsset[];
  portfolio: IAsset[];
  watchlist: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  fetchingMarkets: boolean;
}

export interface IinitalBoardState {
  overlay: boolean;
}

export interface IinitialState {
  AssetsReducer: IinitialAssetsState;
  BoardReducer: IinitalBoardState;
}

export interface IActionReducer {
  type: string;
  coin: IAsset;
  assets: IAsset[];
  watchlist: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  fetchingMarkets: boolean;
}
