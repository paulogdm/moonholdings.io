export interface IAsset {
  position: number;
  marketCap: number;
  name: string;
  percentage: number;
  price: number;
  currency: string;
  value: number;
}

export interface IMarketAsset {
  exchange: string;
  base: string;
  quote: string;
  price_quote: string;
  timestamp: string;
}

export interface IinitialAssetsState {
  assets: IAsset[];
  portfolio: IAsset[];
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
