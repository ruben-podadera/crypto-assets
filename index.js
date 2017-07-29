const allBalances = require('./src/all-assets');
const prices = require('./src/prices');

/**
 * Get all assets for a given config json.
 * See https://github.com/sbouba/crypto-assets for details on config
 *
 * @param config
 * @returns {Promise.<TResult>}
 */
module.exports = function getAssets(config) {
  return allBalances.getAssets(config)
    .then(assets => prices.addPricesToAssets(assets, config.fiat || 'eur'));
};

