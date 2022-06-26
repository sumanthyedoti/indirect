const { merge } = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./webpack.common.js");

module.exports = merge(
  {
    mode: "production",
    module: {
      cache: false,
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/typescript",
                  "@babel/preset-react",
                  "@babel/preset-env",
                ],
              },
            },
          ],
        },
        {
          test: /\.(png|webp|jpg|jpeg|gif)/i,
          type: "asset/resource",
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin()],
  },
  commonConfig
);
