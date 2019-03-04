import * as R from 'ramda'

import { USD_CURRENCIES } from '../shared/constants/api'
import { IMarketAsset } from '../shared/types'

const calculateBasePrice = (assetBtcPrice: string | number, btcPrice: string | number) => 
  (Number(assetBtcPrice) * Number(btcPrice)).toString();

export const filterByExchangeBase =
  (exchanges: IMarketAsset[], usdtExchanges: IMarketAsset[], usdExchanges: IMarketAsset[]) =>
    exchanges.filter((exchange) => {
      let basePriced = usdtExchanges.filter((btcExchange) => btcExchange.exchange === exchange.exchange)[0];
    
      if (!basePriced) {
        basePriced = usdExchanges.filter((btcExchange) => btcExchange.exchange === exchange.exchange)[0];
      }
      
      if (basePriced) {
        const { price_quote: assetBtcPrice } = exchange;
        const { price_quote: btcPrice } = basePriced;
    
        return {
          ...exchange,
          price_quote: calculateBasePrice(assetBtcPrice, btcPrice)
        }
      }
    });

export const filterByUSDbase = (asset: string, combinedMarkets?: IMarketAsset[] | undefined) => {
  if (!combinedMarkets) return [];
  return R.not(R.any(R.equals(asset))(USD_CURRENCIES))
    ? combinedMarkets.filter((marketAsset: IMarketAsset) => {
      if (marketAsset && marketAsset.base) {
        return marketAsset.base === asset;
      }
    }) : [];
}
