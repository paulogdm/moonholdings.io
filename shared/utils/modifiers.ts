import styles from '../../coinStyles.json'
import { ICoinStyle } from '../types'
import { defaultSquareStyle } from '../models'

// check if k is a key of obj
function isKeyof<T>(k: keyof any, obj: T): k is keyof T {
  return k in obj;
}

// Add style to coin square.
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

// Convert Array to Object.
// export const arrayToObject = array =>
//   array.reduce((obj, item) => {
//     obj[item.currency] = item;
//     return obj;
//   }, {});
