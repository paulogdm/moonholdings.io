import { IAsset } from '../../shared/types';

export const floor = (num: number) => (Math.floor(num * 100) / 100);

export const round = (value: number) => Math.round((value) * 100) / 100;

export const multiply = (num1: number, num2: number) => num1 * num2;

export const rounder = (balance: number, priceUsd: number) => round(multiply(balance, floor(priceUsd)));

export function roundFloat(x: number, decimal: number) {
  const precision = Math.pow(10, decimal);
  return Math.round(x * precision) / precision;
}

export const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatPrice = (num: string | number) => Number(num) > 1 ? roundFloat(Number(num), 2) : num;

export const calculateBalance = (coins: IAsset[] = []) =>
  numberWithCommas(floor(coins.reduce((val, coin) => {
    const coinValue = coin && coin.value ? coin.value : 0;
    return (val + +(coinValue));
  }, 0)));

// https://gist.github.com/leongaban/cd34575d2d0fcfc328347430f8938c55
export const nFormatter = (num: number, digits: number) => {
  const si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "B" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }

  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
