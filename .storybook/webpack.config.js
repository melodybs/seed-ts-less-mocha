const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = ({ config }) => {
  config.module.rules.push({
    resolve: {
      alias: {
        // ...config.resolve.alias,
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      },
    }
  })
  
  /* // '@storybook/addon-storysource
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    options: { 
      parser: 'typescript',
      prettierConfig: {
        printWidth: 100,
        tabWidth: 2,
        bracketSpacing: true,
        trailingComma: 'es5',
        singleQuote: true,
      },                            888 = *
      uglyCommentsRegex: [/^eslint-.888/, /^global.888/],
      options: { injectDecorator: true }
    },
    enforce: 'pre'
  }) */

  config.resolve.extensions.push('.ts', '.tsx', '.vue', '.css', '.less', '.scss', '.sass', '.html')

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ],
  })
  config.module.rules.push({ test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] })
  config.module.rules.push({ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' })

  config.plugins.push(new ForkTsCheckerWebpackPlugin())

  return config;
}
  