const { merge } = require("webpack-merge");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const commonConfig = require("./webpack.common.js");

module.exports = merge(
  {
    mode: "development",
    devtool: "eval-cheap-source-map",
    cache: true,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
          type: "asset/resource",
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
