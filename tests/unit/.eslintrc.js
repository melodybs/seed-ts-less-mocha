module.exports = {
  env: {
    node: true,
    mocha: true
  },
  globals: {
    expect: true,
    sinon: true,
    chai: true,
    window: true
  },
  rules: {
    'import/no-webpack-loader-syntax': 'off',
    'no-unused-expressions': 'off'
  }
}
