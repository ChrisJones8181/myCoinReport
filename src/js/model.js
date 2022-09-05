import { MARKET_API_URL } from './config.js';

export const state = {
  cryptoList: [],
  search: {},
};

export const loadCryptoList = async function () {
  try {
    const res = await fetch(MARKET_API_URL);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}(${res.status})`);

    state.cryptoList = data;
  } catch (err) {}
};

export const searchCryto = function (id) {};
