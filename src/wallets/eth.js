const request = require('request');

function getBalances(addresses) {
  const promises = addresses.map((address) => {
    const url = `https://etherchain.org/api/account/${address}`;

    return new Promise((resolve, reject) => {
      request.get(url, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        body = JSON.parse(body);

        return resolve({
          locationType: 'wallet',
          locationCode: address,
          currency: 'eth',
          volume: body.data[0].balance / 1000000000000000000,
        });
      });
    });
  });

  return Promise.all(promises);
}

module.exports = {
  getBalances,
};
