const Bitfinex = require('bitfinex');

function getAssets(config) {
  const bitfinex = new Bitfinex(config.key, config.secret);

  return new Promise((resolve, reject) => {
    bitfinex.wallet_balances((err, balances) => {
      if (err) {
        return reject(err);
      }
      return resolve(balances.map(balance => ({
        locationType: 'exchange',
        locationCode: 'bitfinex',
        currency: balance.currency,
        volume: parseFloat(balance.amount),
      })));
    });
  });
}

module.exports = {
  getAssets,
};
