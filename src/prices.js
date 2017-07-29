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

function addPricesToBalances(balances, fiat) {
  const currencies = balances.map(balance => balance.currency);
  return getPrices(currencies, [fiat])
    .then((prices) => {
      balances.forEach((balance) => {
        balance[fiat] = prices[balance.currency][fiat] * balance.volume;
      });

      return balances;
    });
}

module.exports = {
  getPrices,
  addPricesToBalances,
};
