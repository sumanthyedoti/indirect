const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  target: "web",
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
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
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|webp|jpg|jpeg|gif)/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new BundleAnalyzerPlugin(),
  ],
};
