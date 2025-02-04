export interface IAsset {
  [key: string]: string | number | undefined | boolean;
  availableSupply?: string;
  currency: string;
  exchange: string;
  exchange_base?: string;
  marketCap: number;
  name: string;
  percentage?: number;
  price: number;
  position?: number;
  value?: number;
  inWatchlist?: boolean;
}

export interface IWatchlistAsset {
  availableSupply?: string;
  currency: string;
  exchange: string;
  marketCap: number;
  name: string;
  price: number;
}

export interface ISearchAsset {
  [key: string]: string | number;
  availableSupply: string;
  currency: string;
  name: string;
  price: string;
  marketCap: number;
}

export interface IMarketAsset {
  exchange: string;
  base: string;
  quote: string;
  price_quote: string;
  timestamp: string;
}

export interface IDisableCheck {
  type: string;
  position?: number;
  selected: IAsset | null;
  exchange: string;
  exchanges: IMarketAsset[];
}
