module.exports = {
  mode: 'development', // TODO: Handle this automatically.
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    publicPath: '/assets/',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};
