const path = require("path");
const { mergeWithRules } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack");

const resolve = (_path) => path.resolve(__dirname, _path);

/**@type {import('webpack').WebpackOptionsNormalized} */
const clientConfig = {
  mode: "development",
  entry: {
    entry: {
      import: resolve("./src/client/index.tsx"),
      filename: "js/entry.[contenthash:4].js",
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "client/css/entry.[contenthash:4].css",
    }),
  ],

  output: {
    path: resolve("./dist/client"),
    clean: true,
    chunkFilename: "js/[chunkhash:4].chunk.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/dist/client/css",
            },
          },
        ],
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
