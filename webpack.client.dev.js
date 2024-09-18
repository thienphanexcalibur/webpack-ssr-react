const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack");

const resolve = (_path) => path.resolve(__dirname, _path);

/**@type {import('webpack').WebpackOptionsNormalized} */
const clientConfig = merge(common, {
  mode: "development",
  entry: {
    client: {
      import: resolve("./src/client/index.tsx"),
      filename: "static/[name].[contenthash:4].js",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  output: {
    path: resolve("./dist/client"),
    clean: true,
  },
});

module.exports = clientConfig;
