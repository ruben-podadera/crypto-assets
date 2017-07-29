const _ = require('lodash');
const markets = require('./markets/all-markets');
const wallets = require('./wallets/all-wallets');

function getBalances(config) {
  const promises = [
    markets.getBalances(config.markets),
    wallets.getBalances(config.wallets),
  ];

  return Promise
    .all(promises)
    .then(_.flatten);
}

module.exports = {
  getBalances,
};
