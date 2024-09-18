const path = require("path");
const resolve = (_path) => path.resolve(__dirname, _path);
const { merge } = require("webpack-merge");
const common = require("./webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

/**@type {import('webpack').WebpackOptionsNormalized} */
const config = merge(common, {
  mode: "production",
});

module.exports = config;
