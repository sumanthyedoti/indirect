const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    publicPath: "/",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: "babel-loader",
          //   options: {
          //     presets: ["@babel/preset-env", "@babel/preset-react"],
          //   },
          // },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(png|webp|jpg|jpeg|gif)/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
