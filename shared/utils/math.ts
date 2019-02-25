import { IAsset } from '../../shared/types';

export const floor = (num: number) => (Math.floor(num * 100) / 100);

export const round = (value: number) => Math.round((value) * 100) / 100;

export const multiply = (num1: number, num2: number) => num1 * num2;

export const rounder = (balance: number, priceUsd: number) => round(multiply(balance, floor(priceUsd)));

export function roundFloat(x: number, decimal: number) {
  const precision = Math.pow(10, decimal);
  return Math.round(x * precision) / precision;
};

export const numberWithCommas = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatPrice = (num: string | number) => Number(num) > 1 ? roundFloat(Number(num), 2) : num;


export const calculateBalance = (coins: IAsset[]) =>
  numberWithCommas(floor(coins.reduce((val, coin) => (val + +(coin.value)), 0)));
