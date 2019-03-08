import { IMarketAsset } from './'

export interface IAssetResponse {
  [key: string]: string | undefined;
  currency: string;
  price?: string;
  availableSupply?: string;
  maxSupply?: string;
}

export interface IResponseConfig {
  config?: any;
  data?: IAssetResponse[];
  headers?: any;
  request?: XMLHttpRequest;
  upload?: XMLHttpRequestUpload;
  status?: number;
  statusText?: string;
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
