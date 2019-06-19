module.exports = {
  env: {
    mocha: true
  },
  globals: {
    expect: true,
    sinon: true,
    chai: true
  },
  rules: {
    'import/no-webpack-loader-syntax': 'off',
    'no-unused-expressions': 'off'
  }
}
