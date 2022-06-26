const { merge } = require("webpack-merge");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const commonConfig = require("./webpack.common.js");

module.exports = merge(
  {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.(png|webp|jpg|jpeg|gif)/i,
          type: "asset/resource",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      watchFiles: ["src/**/*"],
      port: 3000,
      hot: true,
      open: true,
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
    ],
  },
  commonConfig
);
