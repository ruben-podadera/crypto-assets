const fs = require('fs');
const allBalances = require('./src/all-balances');
const prices = require('./src/prices');

if (process.argv.length !== 3) {
  console.log('Usage : node index.js config.json');
  process.exit(1);
}

let config = fs.readFileSync(process.argv[2]);
config = JSON.parse(config);

const fiatName = config.fiat || 'eur';

allBalances.getBalances(config)
  .then(balances => prices.addPricesToBalances(balances, fiatName))
  .then((balances) => {
    console.log(balances);

    let sum = balances.reduce((c, b) => c + b[fiatName], 0);
    sum = Math.round(sum * 100) / 100;

    console.log(`Total ${sum} ${fiatName}`);
  });

