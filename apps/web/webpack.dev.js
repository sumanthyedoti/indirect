const { merge } = require("webpack-merge");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const commonConfig = require("./webpack.common.js");

module.exports = merge(
  {
    mode: "development",
    // devtool: "source-map",
    module: {
      rules: [
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
