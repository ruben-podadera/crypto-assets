const _ = require('lodash');

/* eslint-disable global-require */
const wallets = {
  sc: require('./siacoin'),
  eth: require('./eth'),
};

function getBalances(config) {
  const promises = _.map(
    config || {},
    (value, key) => wallets[key].getBalances(value)
  );

  return Promise
    .all(promises)
    .then(_.flatten);
}

module.exports = {
  getBalances,
};
