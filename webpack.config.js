const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const Autoprefixer = require("autoprefixer");

const isProduction = process.env.NODE_ENV === "production";

const paths = {
  DIST: path.resolve(__dirname, "dist"),
  SRC: path.resolve(__dirname, "src"),
  JS: path.resolve(__dirname, "src/js")
};

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(paths.SRC, "index.html"),
  filename: "index.html",
  inject: "body"
});

// used to split specified vendor script
const CommonsChunkPluginConfig = new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  midChunks: Infinity,
  filename: "[name].[hash].js"
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: "style.css",
  disable: false
});

const productionPlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});

const base = {
  entry: {
    app: path.join(paths.JS, "index.js"),
    vendor: ["react", "react-dom", "react-router"]
  },
  output: {
    path: paths.DIST,
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[path][name]__[local]--[hash:base64:5]"
            }
          }
        })
      }
    ]
  }
};

const developmentConfig = {
  devtool: "cheap-module-inline-source-map",
  devServer: {
    contentBase: paths.SRC,
    historyApiFallback: true,
    stats: { colors: true },
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    CommonsChunkPluginConfig,
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig
  ]
};

const productionConfig = {
  devtool: "cheap-module-source-map",
  plugins: [
    HtmlWebpackPluginConfig,
    productionPlugin,
    new ExtractTextPlugin({
      filename: "[name].[hash].css"
    }),
    CommonsChunkPluginConfig,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: __dirname,
        postcss: [Autoprefixer({ browsers: ["last 3 versions"] })]
      }
    })
  ]
};

module.exports = Object.assign(
  {},
  base,
  isProduction === true ? productionConfig : developmentConfig
);
