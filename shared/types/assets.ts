export interface IAsset {
  balance: number;
  marketCap: number;
  name: string;
  percentage: number;
  price: number;
  symbol: string;
  value: number;
}

export interface IinitialState {
  assets: IAsset[];
  portfolio: IAsset[];
  loading: boolean;
}
