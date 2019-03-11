import * as R from 'ramda'

import { USD_CURRENCIES } from '../shared/constants/api'
import { IAsset, IMarketAsset, IGetMarketsRes } from '../shared/types'

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

export const isNotAggregate = (exchange: string) => exchange !== '' && exchange !== 'Aggregate';

export const extractCryptoMarkets =
  (currency: string, { marketBTC, marketETH, marketUSD, marketUSDT }: IGetMarketsRes) => {
    const btcBasedExchanges = marketBTC.filter((market: IMarketAsset) => market.base === currency);
    const ethBasedExchanges = marketETH.filter((market: IMarketAsset) => market.base === currency);
    const btcUSDTprices = marketUSDT.filter((market: IMarketAsset) => market.base === 'BTC');
    const btcUSDprices = marketUSD.filter((market: IMarketAsset) => market.base === 'BTC');
    const ethUSDTprices = marketUSDT.filter((market: IMarketAsset) => market.base === 'ETH');
    const ethUSDprices = marketUSD.filter((market: IMarketAsset) => market.base === 'ETH');
  
    const btcMarkets = notBTCorETH(currency) ?
      filterCryptoBase(btcBasedExchanges, btcUSDTprices, btcUSDprices) : [];
    const ethMarkets = notBTCorETH(currency) ?
      filterCryptoBase(ethBasedExchanges, ethUSDTprices, ethUSDprices) : [];
  
    return {
      btcMarkets,
      ethMarkets
    }
  }

export const extractExchangePrice = (asset: IAsset, markets: IGetMarketsRes) => {
  const { currency, exchange_base: base, exchange, position } = asset;
  const assetPosition = position ? position : 0;
  const cryptoMarkets = extractCryptoMarkets(currency, markets);
  const { btcMarkets, ethMarkets } = cryptoMarkets;

  const useExchange = (base: string) => {
    switch (base) {
      case 'USD':
      case 'USDT':
        return markets['market'+base];
      case 'BTC':
        return btcMarkets;
      case 'ETH': 
        return ethMarkets;
    }
  }

  const exchangeBase = base ? useExchange(base) : useExchange('USDT');

  const exchangeFiltered = exchangeBase.filter((market: IMarketAsset) => {
    if (market && market.exchange === exchange) {
      return market.base === currency && market.quote === base;
    }
  });

  const exchangeObject: IMarketAsset | undefined = R.head(exchangeFiltered);

  if (exchangeObject) {
    const price = Number(exchangeObject.price_quote);

    return {
      ...asset,
      price,
      value: price * assetPosition
    }
  }

  return asset;
}
