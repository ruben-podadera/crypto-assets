const request = require('request');

function getPrices(cryptoSymbols, fiatSymbols) {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://min-api.cryptocompare.com/data/pricemulti',
      qs: {
        fsyms: cryptoSymbols.join(',').toUpperCase(),
        tsyms: fiatSymbols.join(',').toUpperCase(),
      },
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      body = JSON.parse(body.toLowerCase());
      return resolve(body);
    });
  });
}

function addPricesToAssets(assets, fiat) {
  const currencies = assets.map(asset => asset.currency);
  return getPrices(currencies, [fiat])
    .then((prices) => {
      assets.forEach((asset) => {
        asset[fiat] = prices[asset.currency][fiat] * asset.volume;
      });

      return assets;
    });
}

module.exports = {
  getPrices,
  addPricesToAssets,
};
