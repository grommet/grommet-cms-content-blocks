let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/index.js',
    // the entry point of our app
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: '/static/',
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  resolve: {
    alias: {
      'grommet-cms-content-blocks': path.resolve(__dirname, '..', '..', 'src'),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
      options: {
        sassLoader: {
          includePaths: [
            './node_modules',
            './node_modules/grommet/node_modules',
          ],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].css' } },
          { loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              includePaths: [
                './node_modules',
                './node_modules/grommet/node_modules',
              ],
            },
          },
        ],
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
};
