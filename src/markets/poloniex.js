const _ = require('lodash');
const Poloniex = require('poloniex-api-node');

function getBalances(config) {
  const poloniex = new Poloniex(config.key, config.secret);

  return new Promise((resolve, reject) => {
    poloniex
      .returnBalances()
      .then((balances) => {
        balances = _.map(balances, (volume, currency) => ({
          locationType: 'exchange',
          locationCode: 'poloniex',
          currency: currency.toLowerCase(),
          volume: parseFloat(volume),
        }))
          .filter(balance => balance.volume > 0.0);

        return resolve(balances);
      }, reject);
  });
}

module.exports = {
  getBalances,
};
