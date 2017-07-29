![CircleCI](https://circleci.com/gh/sbouba/crypto-assets/tree/master.svg?style=shield) (eslint)

# Crypto Assets

## Presentation
Crypto Assets is a js library that allows to retrieve your cryptocurrency 
assets from several places. This idea came from the need for me to keep
a track of where my assets are. Some are on several exchanges,
some on wallets. It became complicated to know exactly where
everything is.

In opposition to some tools where you declare where your assets are
(like [Blockfolio](https://blockfolio.com/), which is really nice),
Crypto Assets queries a list of exchanges with your (READ ONLY) API keys
or wallet addresses through coin explorers. Thus, when you buy or sell an
asset on an exchange, it will automatically be reported by Crypto Assets.
Once you have made your config with the exchanges or wallets you usually
use, everything is automatic.

## Installation
First checkout locally and install deps:

```
yarn add crypto-assets
```
or
```
npm install --save crypto-assets 
```

## Usage

This example file show how to use it :

```js
const cryptoAssets = require('crypto-assets');

const config = {
  "fiat": "eur",
  "wallets": {
    "eth": ["0xB277E6188b189c22853E9CdB13852597E77E8876"],
    "sc": ["c258335d4b6196c9eb7f3481dc18d8c85f7f8d18cbcc49d8c089554db4ce7632b7d4e985d916"]
  },
  "markets": {
    "bitfinex": {
      "key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    },
    "poloniex": {
      "key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  }
};

cryptoAssets(config).then((assets) => {
  console.log(assets);

  let sum = assets.reduce((c, b) => c + b.eur, 0);
  sum = Math.round(sum * 100) / 100;

  console.log(`Total ${sum} €`);
});
```

Explanation of the config var :
- The `fiat` key indicates in wich fiat currency the Crypto Assets should convert every asset. 
So far it works with with `eur` and `usd`. 
- The `wallets` key list all wallets addresses you have by currency.
- The `markets` key list all markets where you have some assets. For each market you have
to specify the api key and secret. Even if you run this script locally on 
your machine, I recommend to use READ ONE api keys.

This program will output :

```js
[ { locationType: 'exchange',
    locationCode: 'bitfinex',
    currency: 'btc',
    volume: 0.25638038,
    eur: 588.7416494168001 },
  { locationType: 'exchange',
    locationCode: 'bitfinex',
    currency: 'iot',
    volume: 220,
    eur: 46.882000000000005 },
  { locationType: 'exchange',
    locationCode: 'bitfinex',
    currency: 'xrp',
    volume: 300,
    eur: 39.900000000000006 },
  { locationType: 'exchange',
    locationCode: 'poloniex',
    currency: 'btc',
    volume: 0.00940004,
    eur: 21.5858758544 },
  { locationType: 'exchange',
    locationCode: 'poloniex',
    currency: 'eth',
    volume: 0.41570815,
    eur: 64.368249946 },
  { locationType: 'exchange',
    locationCode: 'poloniex',
    currency: 'ltc',
    volume: 10.6451823,
    eur: 356.40070340399996 },
  { locationType: 'exchange',
    locationCode: 'poloniex',
    currency: 'sc',
    volume: 1704.14993461,
    eur: 11.07527042503039 },
  { locationType: 'wallet',
    locationCode: '0xB277E6188b189c22853E9CdB13852597E77E8876',
    currency: 'eth',
    volume: 0.296407175,
    eur: 45.895686977000004 },
  { locationType: 'wallet',
    locationCode: 'c258335d4b6196c9eb7f3481dc18d8c85f7f8d18cbcc49d8c089554db4ce7632b7d4e985d916',
    currency: 'sc',
    volume: 500.22740098590094,
    eur: 3.2509778790073702 } ]
Total 1178.1 eur

```
As you can see, each asset is reported individually : For Bitcoins (btc), some are on Bitfinex and some on Poloniex. 
For Siacoins (sc), a part in on Poloniex exchange and a part in a wallet.


## Contribution

Feel free to contribute to this project by adding more exchanges and 
wallets. Take a look at 
[`src/exchanges/bitfinex.js`](https://github.com/sbouba/crypto-assets/blob/master/src/markets/bitfinex.js)
or 
[`src/wallets/eth.js`](https://github.com/sbouba/crypto-assets/blob/master/src/wallets/eth.js) 
to see how it works. 

You dont know how to contribute ? Here is a guide that explains [how to contribute to a github 
project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/).

While there is no unit testing yet, your code should pass the linter :
```
> yarn run lint
> (or npm run lint)

yarn run v0.24.6
$ eslint --ext .js index.js src 
Done in 1.90s
```   