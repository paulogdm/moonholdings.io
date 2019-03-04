import { IMarketAsset } from './'

export interface IAssetResponse {
  currency: boolean;
  price?: string;
  availableSupply?: string;
  maxSupply?: string;
}

export interface IResponseConfig {
  config: {
    url: string;
  };
  data: IAssetResponse[];
  headers: {};
  request: XMLHttpRequest;
  upload: XMLHttpRequestUpload;
  status: number;
  statusText: string;
}

export interface IGetMarketsRes {
  marketBTC: IMarketAsset[];
  marketETH: IMarketAsset[];
  marketUSD: IMarketAsset[];
  marketUSDC: IMarketAsset[];
  marketUSDT: IMarketAsset[];
}

export interface IMarketRes {
  [key: string]: IMarketAsset[];
}
