import axios from 'axios'

import { NOMICS_API_BASE_URL, NOMICS_KEY, EXCHANGE_MARKET_PRICES, BASE_CURRENCIES } from '../shared/constants/api'
import { IGetMarketsRes, IMarketRes } from '../shared/types'

interface IParams {
  key: string;
  currency?: string;
}

interface IHeaders {
  baseURL: string,
  params: IParams
}

const headers: IHeaders = {
  baseURL: NOMICS_API_BASE_URL,
  params: {
    key: NOMICS_KEY
  }
};

const prepHeaders = (currency: string) => {
  headers.params.currency = currency;
  return axios.create(headers);
};

// GET Prices
// http://docs.nomics.com/#operation/getPrices
export const getPricesRequest = async () => {
  const nomics = axios.create(headers);

  try {
    const prices = await nomics.get('prices');
    return prices;
  } catch (err) {
    return err;
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
    return err;
  }
}

export const fetchMarket = async (currency: string): Promise<any> => {
  try {
    const request = prepHeaders(currency);
    const response =  await request.get(EXCHANGE_MARKET_PRICES);
    return response.data;
  }
  catch(err) {
    return err;
  }
}

// GET Market prices
// http://docs.nomics.com/#operation/getMarkets
// CodeReview question: https://tinyurl.com/y6efxxo6
export const getMarkets = async (): Promise<IGetMarketsRes | undefined> => {
  try {
    const markets: IMarketRes = {};

    for (let currency of BASE_CURRENCIES) {
      const key = 'market' + currency;
      markets[key] = await fetchMarket(currency);
    }

    return {
      marketBTC: markets['marketBTC'],
      marketETH: markets['marketETH'],
      marketUSD: markets['marketUSD'],
      marketUSDC: markets['marketUSDC'],
      marketUSDT: markets['marketUSDT'],
    }
  } catch (err) {
    return err;
  }
}
