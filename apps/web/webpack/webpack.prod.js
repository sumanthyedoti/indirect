const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const commonConfig = require('./webpack.common.js')

module.exports = merge(
  {
    mode: 'production',
    devtool: 'source-map',
    cache: false,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
          type: 'asset/inline',
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minChunks: 1,
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              // drop_console: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name][contenthash].css',
      }),
      new CompressionPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  commonConfig
)
