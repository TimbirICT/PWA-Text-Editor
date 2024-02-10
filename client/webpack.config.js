const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../server/client/dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Path to HTML
        filename: 'index.html', 
      }),
      new WebpackPwaManifest({
        name: 'Your Text Editor',
        short_name: 'Text Editor',
        description: 'A Progressive Web Application Text Editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        crossorigin: 'use-credentials',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/images/icon.png'), // Path to app icon
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src/sw.js', // Path to service worker file
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
