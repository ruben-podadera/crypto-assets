const request = require('request');
const _ = require('lodash');

function getAmountInBlock(block, address) {
  return new Promise((resolve, reject) => {
    const url = `https://explorer.siahub.info/api/block/${block}`;

    request.get(url, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      body = JSON.parse(body);

      let amount = 0;
      _.forEach(body.transactions, (transaction) => {
        _.forEach(transaction.siacoinoutputs, (output) => {
          if (output.unlockhash === address) {
            amount += parseInt(output.value, 10);
          }
        });
      });

      return resolve(amount / 1000000000000000000000000);
    });
  });
}

function getAssets(addresses) {
  const promises = addresses.map((address) => {
    const url = `https://explorer.siahub.info/api/hash/${address}`;

    return new Promise((resolve, reject) => request.get(url,
      (error, response, body) => {
        if (error) {
          return reject(error);
        }

        body = JSON.parse(body);
        const blockPromises = body
          .blocks
          .map(block => getAmountInBlock(block.height, address));

        return Promise
          .all(blockPromises)
          .then(amounts => resolve({
            locationType: 'wallet',
            locationCode: address,
            currency: 'sc',
            volume: amounts.reduce((a, b) => a + b, 0),
          }));
      }));
  });

  return Promise.all(promises);
}

module.exports = {
  getAssets,
};
