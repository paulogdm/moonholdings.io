import axios from 'axios'

const fixerURL = 'https://data.fixer.io/api/';
const fixerKey = '35a3ad0f2f253d37131b68cd1b5953fc';

// Fixer API
export const getEURrates = async (currency: string = 'USD') => {
  const fixerAPI = axios.create({
    baseURL: fixerURL,
    params: {
      base: currency,
      access_key: fixerKey
    }
  });

  try {
    const res = await fixerAPI.get('latest');
    return res;
  } catch (err) {
    console.error(err);
  }
}
