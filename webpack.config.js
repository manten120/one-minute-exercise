const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/app`,
  mode: 'none',
  entry: './entry',
  output: {
    path: `${__dirname}/public/javascripts`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
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
  plugins: [
    // other plugin configs
    new webpack.SourceMapDevToolPlugin({
      exclude: ['popper.js'],
    }),
  ],
  watchOptions: {
    // 仮想環境で--watchオプション(変更時にオートビルド)を有効にする
    poll: true,
  },
};
