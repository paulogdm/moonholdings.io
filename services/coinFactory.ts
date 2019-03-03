import * as R from 'ramda'
import { additionalAssets, supportedAssets } from '../shared/models'
import { IAsset, IAssetResponse, IResponseConfig, IMarketAsset, IGetMarketsRes } from '../shared/types'
import { arrayToObject, multiply, roundFloat, round } from '../shared/utils'
import { formatPrice } from '../shared/utils/math'
import { BASE_CURRENCIES } from '../shared/constants/api'
import { MOON_PORTFOLIO } from '../shared/constants/copy'

const textMatch = (part: string, str: string) => str.search(part) !== -1;

//@ TODO create Interfaces for array types:
const mergeByCurrency = (matchArray: any[], nextArray: any[]) =>
  matchArray.map(m => Object.assign({}, m, nextArray.find(n => n.currency === m.currency)));

// Combines Promises and returns responses together.
export const fetchAll = (array: any[]) => Promise.all(array);

// Return coins that match text | search by currency symbol or name.
export const findAsset = (txt: string, assets: any[]) => {
  const checkText = (k: string, a: any) => (textMatch(txt.toLowerCase(), a[k].toLowerCase()) ? a : null);
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

//@ TODO create Interfaces for portfolio types:
export const sortByValue = (portfolio: any) => portfolio.sort((a: any, b: any) => b.value - a.value);

const keysToClean = [
  'close',
  'dayOpen',
  'dayOpenVolume',
  'dayVolume',
  'high',
  'highExchange',
  'highQuoteCurrency',
  'highTimestamp',
  'maxSupply',
  'monthOpen',
  'monthOpenVolume',
  'monthVolume',
  'weekOpen',
  'weekOpenVolume',
  'weekVolume',
  'yearOpen',
  'yearOpenVolume',
  'yearVolume'
];

// Clean assets by removing unneeded keys.
export const cleanAssets = (assets: any) =>
  // Return our mapped assets array.
  assets.map((asset: any) =>
    // Iterate through each key in the object and create a new object (reduce).
    Object.keys(asset).reduce((newObj, key) => (
      // Check to see if this key is inside keysToClean.
      keysToClean.indexOf(key) < 0
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
      availableSupplies = cleanAssets(response.data);
    }
    return {
      prices,
      availableSupplies
    };
  });

  const assetsPrices = filterAssets(prices);
  const assetsAvailableSupply = filterAssets(availableSupplies);
  const mergedAssets = mergeByCurrency(assetsPrices, assetsAvailableSupply);
  const assetsWithValue = pluckValuableAssets(mergedAssets);

  const assetsWithMarketCap = assetsWithValue.map((asset) => {
    const multipliedCap = multiply(Number(asset.price), Number(asset.availableSupply));
    const roundedCap = roundFloat(multipliedCap, 2);
    const marketCap = roundedCap ? Number(roundedCap) : 0;
    return {
      marketCap,
      ...asset
    };
  });

  const sortedAssets = assetsWithMarketCap.sort((a, b) => b.marketCap - a.marketCap);
  additionalAssets.map((asset: any) => sortedAssets.push(asset));
  return sortedAssets;
};

export const combineExchangeData = (asset: string, { marketUSD, marketUSDC, marketUSDT }: IGetMarketsRes) => {
  const combinedMarkets = marketUSD.concat(marketUSDC).concat(marketUSDT);
  
  const filteredMarkets =
    R.not(R.any(R.equals(asset))(BASE_CURRENCIES))
      ? combinedMarkets.filter((marketAsset: IMarketAsset) => marketAsset.base === asset)
      : [];

  return filteredMarkets.map((market: IMarketAsset) => {
    return {
      ...market,
      price_quote: formatPrice(market.price_quote)
    }
  });
};

export const getExchangePrice = (selectedExchange: string, exchanges: IMarketAsset[]) => {
  const assetExchange = exchanges.filter(({ exchange }) => exchange === selectedExchange.toLowerCase())[0];
  return Number(assetExchange.price_quote);
};

// Add coin's percentage of portfolio.
export const calculatePercentage = (portfolio: IAsset[], coin: IAsset) => {
  if (coin) {
    portfolio.push(coin);
  }

  const totalValue = portfolio.reduce((acc: number, { value }: IAsset) => {
    const valueAmount = value ? value : 0;
    return acc + valueAmount;
  }, 0);

  const updatedPortfolio = portfolio.map((c) => {
    const coinValue = c.value ? c.value : 0;
    c.percentage = round((coinValue / totalValue) * 100);
    return c;
  });

  return updatedPortfolio;
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
