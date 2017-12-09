const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "eval",
  context: path.join(__dirname),
  entry: ["webpack-hot-middleware/client?reload=true", "./src/client/app/index.jsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static"
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      nodeModules: path.resolve(__dirname, "./node_modules"),
      commonStyles: path.resolve(__dirname, "./src/client/styles"),
      root: path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".json", ".webpack.js", ".web.js"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: [
            require.resolve("babel-preset-es2015"),
            require.resolve("babel-preset-react"),
            require.resolve("babel-preset-stage-0")
          ]
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /.scss$/,
        loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
      },
      {
        test: /\.css$/,
        loader: "style!css!"
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loaders: ["file-loader?name=[path][name].[ext]"]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg\?)+/,
        loader: "file-loader"
      }
    ]
  }
};
