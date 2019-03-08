import * as R from 'ramda'

import { USD_CURRENCIES } from '../shared/constants/api'
import { IMarketAsset } from '../shared/types'

const calculateBasePrice = (assetBtcPrice: string | number, usdPrice: string | number) => 
  (Number(assetBtcPrice) * Number(usdPrice)).toString();

export const filterCryptoBase =
  (exchanges: IMarketAsset[] | any, usdtExchanges: IMarketAsset[], usdExchanges: IMarketAsset[]) => {
    return exchanges.map((exchange: IMarketAsset) => {
      let basePriced = usdtExchanges.filter((btcExchange) => btcExchange.exchange === exchange.exchange)[0];
      if (!basePriced) {
        basePriced = usdExchanges.filter((btcExchange) => btcExchange.exchange === exchange.exchange)[0];
      }

      if (exchange && basePriced && exchange.price_quote && basePriced.price_quote) {
        const { price_quote: assetBtcPrice } = exchange; // Asset price in BTC/ETH
        const { price_quote: usdPrice } = basePriced; // BTC/ETH price in USDT/USD
        const price_quote = calculateBasePrice(assetBtcPrice, usdPrice).toString();
    
        return {
          ...exchange,
          price_quote
        }
      }

      return null;
    });
  }

export const filterByUSDbase = (asset: string, combinedMarkets?: IMarketAsset[] | undefined) => {
  if (!combinedMarkets) return [];
  return R.not(R.any(R.equals(asset))(USD_CURRENCIES))
    ? combinedMarkets.filter((marketAsset: IMarketAsset) => {
      if (marketAsset && marketAsset.base) {
        return marketAsset.base === asset;
      }
    }) : [];
}

export const notBTCorETH = (asset: string) => asset !== 'BTC' && asset !== 'ETH';
