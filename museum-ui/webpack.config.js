// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
    filename: "[name][contenthash].js",
    assetModuleFilename: "[name][ext]"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@service": path.resolve(__dirname, "./src/service"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@tools": path.resolve(__dirname, "./src/tools"),
      "@img": path.resolve(__dirname, "./src/assets/img"),
      "@*": path.resolve(__dirname, "./src/*")
    }
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    compress: true,
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
        exclude: /node_modules/,
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
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
