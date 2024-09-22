const path = require("path");
const { mergeWithRules } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack");

const resolve = (_path) => path.resolve(__dirname, _path);

/**@type {import('webpack').Configuration} */
const clientConfig = {
  name: "client",
  entry: {
    entry: {
      import: resolve("../client/index.tsx"),
      filename: "js/entry.[contenthash:4].js",
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/entry.[contenthash:4].css",
      chunkFilename: "css/[chunkhash:4].chunk.css",
    }),
  ],

  output: {
    path: resolve("../dist/client"),
    clean: true,
    chunkFilename: "js/[chunkhash:4].chunk.js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "esbuild-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};

const test = mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: "prepend",
    },
  },
})(common, clientConfig);

module.exports = test;
