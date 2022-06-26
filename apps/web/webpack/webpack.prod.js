const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./webpack.common.js");

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
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
          type: "asset/inline",
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
          extractComments: false,
        }),
      ],
    },
  },
  commonConfig
);
