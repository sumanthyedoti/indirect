const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const commonConfig = require('./webpack.common.js')

module.exports = merge(
  {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    cache: true,
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              // options: {
              //   plugins: [require.resolve('react-refresh/babel')],
              // },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
          type: 'asset/resource',
        },
      ],
    },
    devServer: {
      port: 3000,
      hot: true,
      // open: true,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 1,
      },
    },
    plugins: [new ReactRefreshWebpackPlugin()],
  },
  commonConfig
)
