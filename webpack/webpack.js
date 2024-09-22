const path = require("path");
const resolve = (_path) => path.resolve(__dirname, _path);
const webpack = require("webpack");

/**@type {import('webpack').WebpackOptionsNormalized} */
const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  resolve: {
    alias: {
      root: resolve("../"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  plugins: [
    new webpack.DefinePlugin({
      __mode__: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

module.exports = config;
