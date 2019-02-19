export interface IAsset {
  position: number;
  marketCap: number;
  name: string;
  percentage: number;
  price: number;
  currency: string;
  value: number;
}

export interface IinitialState {
  assets: IAsset[];
  portfolio: IAsset[];
  loading: boolean;
}
