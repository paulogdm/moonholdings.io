/* eslint-disable no-param-reassign */
import * as R from 'ramda'
import { additionalAssets, supportedAssets } from '../shared/models'
import { multiply, roundFloat } from '../shared/utils'

const textMatch = (part: string, str: string) => str.search(part) !== -1;

//@ TODO create Interfaces for array types:
const mergeByCurrency = (matchArray: any[], nextArray: any[]) =>
  matchArray.map(m => Object.assign({}, m, nextArray.find(n => n.currency === m.currency)));

// Return coins that match text | search by symbol or name.
export const findAsset = (txt: string, assets: any[]) => {
  const checkText = (k: string, a: any) => (textMatch(txt, a[k].toLowerCase()) ? a : null);
  const curriedCheckText = R.curry(checkText);
  const byName = R.map(curriedCheckText('name'), assets);
  const bySymbol = R.map(curriedCheckText('currency'), assets);
  const matchNames = R.reject(R.isNil, byName);
  const matchSymbols = R.reject(R.isNil, bySymbol);
  const combinedSearch = (matchNames.concat(matchSymbols));
  return R.uniq(combinedSearch);
};

export const filterAssets = (assets: any) => {
  const mergedAssets = mergeByCurrency(supportedAssets, assets);
  const filteredAssets = mergedAssets.filter(asset => asset.name ? asset : null);
  return filteredAssets;
};

export const sortByValue = (portfolio: any) => portfolio.sort((a, b) => b.value - a.value);

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

export const formatAssets = (responses: any) => {
  let prices: any;
  let availableSupplies: any;

  responses.forEach((response: any) => {
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
  const availableSupply = filterAssets(availableSupplies);
  const mergedAssets = mergeByCurrency(assetsPrices, availableSupply);

  const assetsWithMarketCap = mergedAssets.map((asset) => {
    const multipliedCap = multiply(asset.price, asset.availableSupply);
    const roundedCap = roundFloat(multipliedCap, 2);
    const marketCap = roundedCap ? Number(roundedCap) : 0;
    return {
      marketCap,
      ...asset
    };
  });

  const assetsWithPrice = assetsWithMarketCap.filter(asset => asset.price);
  const sortedAssets = assetsWithPrice.sort((a, b) => b.marketCap - a.marketCap);

  // Add additional assets.
  additionalAssets.map((asset: any) => sortedAssets.push(asset));

  return sortedAssets;
};
