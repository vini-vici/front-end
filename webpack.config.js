const { resolve } = require('path');
const TsChecker = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');

const fromRoot = (...args) => resolve(process.cwd(), ...args);
const fromSrc = fromRoot.bind(null, 'src');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    main: fromSrc('main.tsx')
  },
  output: {
    path: fromRoot('public')
  },
  devServer: {
    hot: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': fromSrc('.')
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /\.spec\.|node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          CssPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new TsChecker({
      typescript: {
        configFile: fromSrc('tsconfig.json')
      }
    }),
    new HtmlPlugin({
      template: fromRoot('static', 'index.html')
    }),
    new CssPlugin()
  ]
};