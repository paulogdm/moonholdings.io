import styles from '../../coinStyles.json'
import { IAsset, ICoinStyle, IMarketAsset } from '../types'
import { defaultSquareStyle } from '../models'

export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

// check if k is a key of obj
function isKeyof<T>(k: keyof any, obj: T): k is keyof T {
  return k in obj;
}

// Add style to coin square
export const setStyle = (symbol: string): ICoinStyle => {
  const symbolLowerCase = symbol.toLowerCase();
  return isKeyof(symbolLowerCase, styles) ? styles[symbolLowerCase] : defaultSquareStyle;
}

export const coinHasLightBg = (symbol: string) => {
  const symbolLowerCase = symbol.toLowerCase();
  return isKeyof(symbolLowerCase, styles) ? !!styles[symbolLowerCase].lightBg : null;
}

export const styleModifier = (id: string) =>
  (coinHasLightBg(id)
    ? `square bg-${id.toLowerCase()} bg-lite`
    : `square bg-${id.toLowerCase()}`);

export const setSearchBtnDisabled = (selected: IAsset | null, exchange: string, exchanges: IMarketAsset[]) => {
  if (!selected || selected && Array.isArray(exchanges) && exchanges.length > 0 && !exchange) {
    return true;
  }

  return false;
}

// Convert Array to Object
// export const arrayToObject = array =>
//   array.reduce((obj, item) => {
//     obj[item.currency] = item;
//     return obj;
//   }, {});
