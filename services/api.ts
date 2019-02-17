import axios from 'axios'

const nomicsAPI = 'https://api.nomics.com/v1/';
const nomicsKey = '8feb5b31914ce3584de5c396d7d65a39';

const headers = {
  baseURL: nomicsAPI,
  params: {
    key: nomicsKey
  }
};

// Nomics API | GET Prices
export const getPrices = async () => {
  const nomics = axios.create(headers);

  try {
    const prices = await nomics.get('/prices');
    return prices;
  } catch (err) {
    console.error(err);
  }
}

// Nomics API | GET Dashboard (For getting availableSupply to calculate MarketCap)
export const getAvailableSupply = async () => {
  const nomics = axios.create(headers);

  try {
    const supplies = await nomics.get('/dashboard');
    return supplies;
  } catch (err) {
    console.error(err);
  }
}
