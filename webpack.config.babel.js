import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'grommet-cms-content-blocks',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    sourceMapFilename: "[name].js.map",
  },
  resolve: {
    alias: {
      'grommet-cms-content-blocks': path.resolve(__dirname, '..', '..', 'src'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};