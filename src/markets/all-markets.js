const _ = require('lodash');

/* eslint-disable global-require */
const markets = {
  bitfinex: require('./bitfinex'),
  poloniex: require('./poloniex'),
};

function getAssets(config) {
  const promises = _.map(
    config || {},
    (value, key) => markets[key].getAssets(value)
  );

  return Promise
    .all(promises)
    .then(_.flatten);
}

module.exports = {
  getAssets,
};
