module.exports = {
  env: {
    node: true,
    mocha: true,
    jest: true
  },
  globals: {
    expect: true,
    sinon: true,
    chai: true
  },
  rules: {
    'import/no-webpack-loader-syntax': 'off'
  }
}
