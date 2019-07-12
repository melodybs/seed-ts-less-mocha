module.exports = {
  env: {
    node: true,
    mocha: true
    // browser: true
  },
  globals: {
    expect: true,
    sinon: true,
    chai: true,
    window: true
    // global: true
  },
  rules: {
    'import/no-webpack-loader-syntax': 'off',
    'no-unused-expressions': 'off'
  }
}
