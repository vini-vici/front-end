/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { writeFileSync, existsSync } = require('fs');
const { execSync } = require('child_process');
const TsChecker = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const fromRoot = (...args) => resolve(process.cwd(), ...args);
const fromSrc = fromRoot.bind(null, 'src');

/**
 * Run on build, checks for a config.json file and if it doesn't find one
 * will pull values from the exports in cloudformation.
 */
function populateConfig() {
  if (!existsSync(fromSrc('config.json'))) {
    const { region = 'us-west-1' } = process.env;
    // Get the raw data
    const raw = execSync('aws cloudformation list-exports --region ' + region).toString();
    // Parse it
    const data = JSON.parse(raw);
    // if we don't have anything, fucky wucky
    if (data.Exports.length === 0) throw Error('You must run the shared infrastructure and deployments first.');
    // Turn the array into an object
    const obj = data.Exports.reduce((cumulative, cur) => {
      cumulative[cur.Name] = cur.Value;
      return cumulative;
    }, {});
    // map out the config
    const config = {
      COGNITO_DOMAIN: obj.UserPoolDomain,
      CLIENT_ID: obj.UserPoolClientId,
      REGION: region,
      API: obj.ApiEndpoint || obj['ApiEndpoint-V2'],
      POOL_ID: obj.UserPoolId
    };
    // Write the file.
    writeFileSync(fromSrc('config.json'), JSON.stringify(config));
  }
}

populateConfig();

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
    static: {
      directory: fromRoot('static'),
      publicPath: '/static'
    },
    allowedHosts: [
      'test.vicci.dev',
      'localhost'
    ],
    historyApiFallback: true,
    https: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': fromSrc('.'),
      'react': fromRoot('node_modules/react'),
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
    new CopyPlugin({
      patterns: [
        {
          from: 'static/**/*',
          to: fromRoot('dist/'),
          globOptions: {
            ignore: ['index.html']
          }
        }
      ]
    }),
    new HtmlPlugin({
      template: fromRoot('index.html')
    }),
    new CssPlugin(),
  ]
};