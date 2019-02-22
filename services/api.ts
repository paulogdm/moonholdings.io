import axios from 'axios'
import * as R from 'ramda'

import { IMarketAsset } from '../shared/types'

const nomicsAPI = 'https://api.nomics.com/v1/';
const nomicsKey = '8feb5b31914ce3584de5c396d7d65a39';
const exchangeMarketPrices = 'exchange-markets/prices';

interface IParams {
  key: string;
  currency?: string;
}

interface IHeaders {
  baseURL: string,
  params: IParams
}

const headers: IHeaders = {
  baseURL: nomicsAPI,
  params: {
    key: nomicsKey
  }
};

const prepHeaders = (currency: string) => {
  headers.params.currency = currency;
  return axios.create(headers);
};

// GET Prices
// http://docs.nomics.com/#operation/getPrices
export const getPrices = async () => {
  const nomics = axios.create(headers);

  try {
    const prices = await nomics.get('prices');
    return prices;
  } catch (err) {
    console.error(err);
  }
}

// GET Dashboard (For getting availableSupply to calculate MarketCap)
// http://docs.nomics.com/#operation/getDashboard
export const getAvailableSupply = async () => {
  const nomics = axios.create(headers);

  try {
    const supplies = await nomics.get('/dashboard');
    return supplies;
  } catch (err) {
    console.error(err);
  }
}

interface IGetMarketsRes {
  marketUSD: IMarketAsset[],
  marketUSDC: IMarketAsset[],
  marketUSDT: IMarketAsset[]
}

// Get Market prices
// http://docs.nomics.com/#operation/getMarkets
export const getMarkets = async (): Promise<IGetMarketsRes | undefined> => {
  try {
    const nomicsUSD = prepHeaders('111');
    const marketUSD = await nomicsUSD.get(exchangeMarketPrices);
    const nomicsUSDC = prepHeaders('222');
    const marketUSDC = await nomicsUSDC.get(exchangeMarketPrices);
    const nomicsUSDT = prepHeaders('333');
    const marketUSDT = await nomicsUSDT.get(exchangeMarketPrices);
  
    const { data: dataUSD } = marketUSD;
    const { data: dataUSDC } = marketUSDC;
    const { data: dataUSDT } = marketUSDT;
  
    if (R.isEmpty(dataUSD) || R.isEmpty(dataUSDC) || R.isEmpty(dataUSDT)) {
      console.error('Market data unavailable');
    }
    
    return {
      marketUSD: marketUSD.data,
      marketUSDC: marketUSDC.data,
      marketUSDT: marketUSDT.data
    }
  } catch (error) {
    console.error(error);
  }
}
