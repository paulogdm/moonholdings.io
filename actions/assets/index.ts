import { getPrices, getAvailableSupply } from '../../services/api';
import { formatAssets } from '../../services/coinFactory';
// import { multiply, roundFloat } from '../../utils';

export const Actions = {
  GET_PRICES_REQUEST: 'GET_PRICES_REQUEST',
  ADD_COIN_PORTFOLIO: 'ADD_COIN_PORTFOLIO',
  ADD_COINS_PORTFOLIO: 'ADD_COINS_PORTFOLIO',
  UPDATE_COIN_PORTFOLIO: 'UPDATE_COIN_PORTFOLIO',
  REMOVE_COIN_PORTFOLIO: 'REMOVE_COIN_PORTFOLIO'
};

// Action creators
const getPricesRequest = data => ({
  type: Actions.GET_PRICES_REQUEST,
  assets: data
});

// const addCoinPortfolio = coin => ({
//   type: Actions.ADD_COIN_PORTFOLIO,
//   coin
// });

// const addCoinsPortfolio = coins => ({
//   type: Actions.ADD_COINS_PORTFOLIO,
//   coins
// });

// const updateCoinInPortfolio = coin => ({
//   type: Actions.UPDATE_COIN_PORTFOLIO,
//   coin
// });

// const removeCoinInPortfolio = coin => ({
//   type: Actions.REMOVE_COIN_PORTFOLIO,
//   coin
// });

const fetchAll = (array: any[]) => Promise.all(array);

// Fetch assets from Nomics API V1.
export const startGetPrices = () => dispatch =>
  fetchAll([getPrices(), getAvailableSupply()]).then((responses) => {
    const formattedAssets = formatAssets(responses);
    dispatch(getPricesRequest(formattedAssets));
  });

// Fetch the coins form localStorage.
// export const addCoins = coins => dispatch => getPrices().then((res) => {
//   const portfolioAssets = coins.map((coin) => {
//     const updatedCoin = res.data.filter(asset => coin.currency === asset.currency).pop();
//     const updatedCoinPrice = updatedCoin ? updatedCoin.price : '1';
//     return {
//       price: updatedCoinPrice,
//       availableSupply: coin.availableSupply,
//       balance: coin.balance,
//       currency: coin.currency,
//       marketCap: multiply(coin.availableSupply, updatedCoinPrice),
//       name: coin.name,
//       percentage: coin.percentage,
//       value: roundFloat(multiply(coin.balance, updatedCoinPrice), 2)
//     };
//   });

//   dispatch(addCoinsPortfolio(portfolioAssets));
// });

// Add a coin to your portfolio.
// export const addCoin = coin => (dispatch) => {
//   dispatch(addCoinPortfolio(coin));
// };

// Remove coin from your portfolio.
// export const removeCoin = coin => (dispatch) => {
//   dispatch(removeCoinInPortfolio(coin));
// };

// Update a coin in your portfolio.
// export const updateCoin = coin => (dispatch) => {
//   dispatch(updateCoinInPortfolio(coin));
// };
