//https://www.coingecko.com/en/api/documentation
// coins/markets to get top 100 list

import * as model from './model.js';
import listView from './views/listView.js';

const controlCryptoList = async function () {
  try {
    // listView.renderSpinner();

    // 1) Load the list of top cryptos
    await model.loadCryptoList();

    // 2) Render the list in the table
    listView.render(model.state.cryptoList);
  } catch (err) {
    alert(err);
  }
};

controlCryptoList();
