const _ = require('lodash');

/* eslint-disable global-require */
const markets = {
  bitfinex: require('./bitfinex'),
  poloniex: require('./poloniex'),
};

function getBalances(config) {
  const promises = _.map(
    config || {},
    (value, key) => markets[key].getBalances(value)
  );

  return Promise
    .all(promises)
    .then(_.flatten);
}

module.exports = {
  getBalances,
};
