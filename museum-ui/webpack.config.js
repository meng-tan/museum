// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
    assetModuleFilename: "[name][ext]"
  },
  resolve: {
    extensions: [".js", "jsx", ".ts", "tsx"],
    alias: {
      "@service": path.resolve(__dirname, "./src/service"),
      "@img": path.resolve(__dirname, "./src/assets/img"),
      "@tools": path.resolve(__dirname, "./src/tools")
    }
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Museum",
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico")
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"]
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, "css-loader", "less-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/i,
        type: "asset"
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
    config.devtool = "source-map";
  }
  return config;
};
