// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: false
  },
  extends: 'airbnb-base',
  // add your custom rules here
  rules: {
    'no-param-reassign' : 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    indent: [
      2,
      2
    ],
    quotes: [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    semi: [
      2,
      'always'
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
