const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: "./app/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist",
    filename: "build.js"
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
      }
    ]
  }
}