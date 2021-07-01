/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const TsChecker = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');

const fromRoot = (...args) => resolve(process.cwd(), ...args);
const fromSrc = fromRoot.bind(null, 'src');

const { NODE_ENV = 'development' } = process.env;

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: NODE_ENV,
  entry: {
    main: fromSrc('main.tsx')
  },
  output: {
    path: fromRoot('dist')
  },
  devServer: {
    contentBase: fromRoot('static'),
    liveReload: true,
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': fromSrc('.'),
      'react-dom': '@hot-loader/react-dom'
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
        test: /\.module\.css$/,
        use: [
          CssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.module\./,
        use: [
          CssPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
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