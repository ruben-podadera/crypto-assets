const _ = require('lodash');
const markets = require('./markets/all-markets');
const wallets = require('./wallets/all-wallets');

function getAssets(config) {
  const promises = [
    markets.getAssets(config.markets),
    wallets.getAssets(config.wallets),
  ];

  return Promise
    .all(promises)
    .then(_.flatten);
}

module.exports = {
  getAssets,
};
