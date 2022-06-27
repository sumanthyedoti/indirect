const { merge } = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const CompressionPlugin = require("compression-webpack-plugin")
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const commonConfig = require("./webpack.common.js")

module.exports = merge(
  {
    mode: "production",
    devtool: "source-map",
    cache: false,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
          type: "asset/inline",
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      // new CompressionPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
  },
  commonConfig
)
