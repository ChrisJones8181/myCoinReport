const currency = 'gbp';

const resultsPerPage = 50;

export const MARKET_API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${resultsPerPage}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d`;
