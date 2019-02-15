import axios from 'axios'
import { nomicsKey } from '../nomicsKey'

const nomicsAPI = 'https://api.nomics.com/v1/';

// Nomics API | GET Prices
export const getPrices = async () => {
  const nomics = axios.create({
    baseURL: nomicsAPI,
    params: {
      key: nomicsKey
    }
  });

  try {
    const prices = await nomics.get('/prices');
    return prices;
  } catch (err) {
    console.error(err);
  }
}

// Nomics API | GET Dashboard (For getting availableSupply to calculate MarketCap)
export const getAvailableSupply = async () => {
  const nomics = axios.create({
    baseURL: nomicsAPI,
    params: {
      key: nomicsKey
    }
  });

  try {
    const supplies = await nomics.get('/dashboard');
    return supplies;
  } catch (err) {
    console.error(err);
  }
}
