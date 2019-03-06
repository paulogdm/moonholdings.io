import * as R from 'ramda'

import { filterCryptoBase, filterByUSDbase, notBTCorETH } from './exchangeFilters'
import { additionalAssets, supportedAssets } from '../shared/models'
import {
  IAsset, IAssetResponse, ISearchAsset, IResponseConfig, IMarketAsset, IGetMarketsRes,
} from '../shared/types'
import { arrayToObject, multiply, roundFloat, round } from '../shared/utils'
import { formatPrice } from '../shared/utils/math'
import { MOON_PORTFOLIO } from '../shared/constants/copy'
import { KEYS_TO_CLEAN } from '../shared/constants/api'

const textMatch = (part: string, str: string) => str.search(part) !== -1;

const mergeByCurrency = (matchArray: IAssetResponse[], nextArray: IAssetResponse[]) =>
  matchArray.map(m => Object.assign({}, m, nextArray.find(n => n.currency === m.currency)));

// Combines Promises and returns responses together.
// @TODO Fix any type.
// export const fetchAll = <T extends {}>(array: T[]) => Promise.all(array);
export const fetchAll = (array: any[]) => Promise.all(array);

// Return coins that match text | search by currency symbol or name.
export const findAsset = (txt: string, assets: ISearchAsset[]) => {
  const checkText = (k: string, a: ISearchAsset) =>
    (textMatch(txt.toLowerCase(), a[k].toString().toLowerCase()) ? a : null);
  const curriedCheckText = R.curry(checkText);
  const byName = R.map(curriedCheckText('name'), assets);
  const bySymbol = R.map(curriedCheckText('currency'), assets);
  const matchNames = R.reject(R.isNil, byName);
  const matchSymbols = R.reject(R.isNil, bySymbol);
  const combinedSearch = (matchNames.concat(matchSymbols));
  return R.uniq(combinedSearch);
};

export const filterAssets = (assets: IAssetResponse[]) => {
  const mergedAssets = mergeByCurrency(supportedAssets, assets);
  return mergedAssets.filter(asset => asset.name ? asset : null);
};

const pluckValuableAssets = (assets: IAssetResponse[]) => {
  const cleanedAssets = assets.filter((asset) => {
    if (asset.availableSupply) return asset;
    if (asset.price) return asset;
  });
  return cleanedAssets;
}

export const sortByValue = (portfolio: IAsset[]) => portfolio.sort((a: IAsset, b: IAsset) => 
  b.value && a.value ? b.value - a.value : 0);

// Clean assets by removing unneeded keys.
export const cleanAssets = (assets: IAssetResponse[]) =>
  // Return our mapped assets array.
  assets.map((asset: IAssetResponse) =>
    // Iterate through each key in the object and create a new object (reduce).
    Object.keys(asset).reduce((newObj, key) => (
      // Check to see if this key is inside KEYS_TO_CLEAN.
      KEYS_TO_CLEAN.indexOf(key) < 0
      // If not, add it to the new object.
        ? ({ ...newObj, [key]: asset[key] })
        // Otherwise, ignore the key and move on
        // so that its not in our new object anymore.
        : newObj
    ), {}));

// Filter assets by supportedAssets then merge asset arrays.
// Remove assets without price & availableSupply.
// Multiply price * availableSupply to add marketCap, then add additionalAssets.
// Finally return assets sorted by marketCap.
export const formatAssets = (responses: IResponseConfig[]) => {
  let prices: any;
  let availableSupplies: any;

  responses.forEach((response: IResponseConfig) => {
    const { config } = response;
    const { url } = config;

    if (url.includes('prices')) {
      prices = response.data;
    } else if (url.includes('dashboard')) {
      const { data } = response;
      if (data) availableSupplies = cleanAssets(data);
    }

    return { prices, availableSupplies };
  });

  const assetsPrices = filterAssets(prices);
  const assetsAvailableSupply = filterAssets(availableSupplies);
  const mergedAssets = mergeByCurrency(assetsPrices, assetsAvailableSupply);
  const assetsWithValue = pluckValuableAssets(mergedAssets);

  const assetsWithMarketCap = assetsWithValue.map((asset) => {
    const multipliedCap = multiply(Number(asset.price), Number(asset.availableSupply));
    const roundedCap = roundFloat(multipliedCap, 2);
    const marketCap = roundedCap ? Number(roundedCap) : 0;
    return { ...asset, marketCap };
  });

  const sortedAssets = assetsWithMarketCap.sort((a, b) => b.marketCap - a.marketCap);
  additionalAssets.map((asset: any) => sortedAssets.push(asset));
  return sortedAssets;
};

// Filter by BTC, ETH, USD, USDT or USDC prices
// If asset has BTC/ETH pairing, obtain exchange BTC/ETH price to calculate assets USD/USDT value
export const combineExchangeData =
  (asset: string, { marketBTC, marketETH, marketUSD, marketUSDT, marketUSDC }: IGetMarketsRes) => {
    const btcBasedExchanges = marketBTC.filter((market: IMarketAsset) => market.base === asset);
    const ethBasedExchanges = marketETH.filter((market: IMarketAsset) => market.base === asset);
    const btcUSDTprices = marketUSDT.filter((market: IMarketAsset) => market.base === 'BTC');
    const btcUSDprices = marketUSD.filter((market: IMarketAsset) => market.base === 'BTC');
    const ethUSDTprices = marketUSDT.filter((market: IMarketAsset) => market.base === 'ETH');
    const ethUSDprices = marketUSD.filter((market: IMarketAsset) => market.base === 'ETH');

    const btcPricedMarkets = notBTCorETH(asset) ?
      filterCryptoBase(btcBasedExchanges, btcUSDTprices, btcUSDprices) : [];
    const ethPricedMarkets = notBTCorETH(asset) ?
      filterCryptoBase(ethBasedExchanges, ethUSDTprices, ethUSDprices) : [];
    
    const btcMarkets = R.not(R.isEmpty(btcPricedMarkets)) ?
      btcPricedMarkets.filter((market: IMarketAsset) => R.not(R.isNil(market))) : [];
    const ethMarkets = R.not(R.isEmpty(ethPricedMarkets)) ?
      ethPricedMarkets.filter((market: IMarketAsset) => R.not(R.isNil(market))) : [];

    const combinedMarkets = notBTCorETH(asset) ?
      btcMarkets.concat(ethMarkets).concat(marketUSD).concat(marketUSDC).concat(marketUSDT) :
      marketUSD.concat(marketUSDC).concat(marketUSDT);
  
    const filteredMarkets = filterByUSDbase(asset, combinedMarkets);
 
    if (R.isEmpty(filteredMarkets)) return [];

    return filteredMarkets.map((market: IMarketAsset) => ({
      ...market,
      price_quote: formatPrice(market.price_quote)
    }));
  };

export const getExchangePrice = (selectedExchange: string, exchanges: IMarketAsset[]) => {
  const assetExchange = exchanges.filter(({ exchange }) => exchange === selectedExchange.toLowerCase())[0];
  return Number(assetExchange.price_quote);
};

// Update Portfolio with new updated Asset.
export const remapUpdatedPortfolio = (portfolio: IAsset[], updatedCoin: IAsset) =>
  portfolio.map((coin: IAsset) => {
    if (updatedCoin && updatedCoin.currency === coin.currency) {
      return {
        ...coin,
        position: updatedCoin.position,
        value: updatedCoin.value
      };
    }
    return coin;
  });

const totalValue = (portfolio: IAsset[]) => portfolio.reduce((acc: number, { price, position }: IAsset) => {
  const valueAmount = position && price ? position * price : 0;
  return acc + valueAmount;
}, 0);

// Add coin's percentage of portfolio.
export const calculatePercentage = (type: string, portfolio: IAsset[], coin?: IAsset) => {
  if (coin) {
    portfolio.push(coin);
  }

  const newPortfolio = portfolio.map((coin) => {
    let coinValue = 0;

    if (type === 'ADD_COIN_PORTFOLIO' || type === 'REMOVE_COIN_PORTFOLIO') {
      const { value } = coin;
      if (value) coinValue = value ? value : 0;
    }
    else if (type === 'UPDATE_COIN_PORTFOLIO') {
      const { position, price } = coin;
      if (position && price) coinValue = position * price;
    }

    const percentage = round((coinValue / totalValue(portfolio)) * 100);

    return {
      ...coin,
      percentage,
      value: coinValue > 1 ? roundFloat(coinValue, 2) : coinValue
    };
  });

  return newPortfolio;
};

export const updateWatchlist = (coin: IAsset, watchlist: IAsset[]) => {
  watchlist.push(coin);
  return watchlist.map((c) => c);
};

export const formatCoinsList = (type: string, coins: IAsset[], data: IAsset[]) => {
  return coins.map((coin) => {
    const availableSupply = coin.availableSupply ? coin.availableSupply : '0';
    const coinAsset = data.filter((asset: IAsset) => coin.currency === asset.currency).pop();
    const currency = coin.currency;
    const exchange = coin.exchange ? coin.exchange : 'Aggregate';
    const exchange_base = coin.exchange_base ? coin.exchange_base : '';
    const price = coinAsset ? Number(coinAsset.price) : 1;
    const percentage = coin.percentage ? coin.percentage : 0;
    const position = coin.position ? coin.position : 0;
    const marketCap = multiply(Number(coin.availableSupply), price);
    const name = coin.name;
    const value = roundFloat(multiply(position, price), 2);

    const coinBaseObject = {
      availableSupply,
      currency,
      exchange,
      marketCap,
      name,
      price,
    };

    // If Portfolio else format asset for Watchlist.
    return type === MOON_PORTFOLIO ?  {
      ...coinBaseObject,
      exchange_base,
      percentage,
      position,
      value,
    } : coinBaseObject;
  });
}

// Formats assets from local storage into IAsset array.
export const jsonFormatFromObject = (list: IAsset[]) => JSON.stringify(arrayToObject(list));
