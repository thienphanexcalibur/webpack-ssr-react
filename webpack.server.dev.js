const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack");
const nodeExternals = require("webpack-node-externals");

const resolve = (_path) => path.resolve(__dirname, _path);
/**@type {import('webpack').WebpackOptionsNormalized} */
const serverConfig = merge(common, {
  mode: "development",
  entry: {
    server: {
      import: resolve("./src/server/index.tsx"),
      filename: "[name].js",
    },
  },
  externalsPresets: {
    node: true,
  },
  externals: [nodeExternals()],
  output: {
    path: resolve("./dist/server"),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: "esbuild-loader",
        options: {},
      },
    ],
  },
});

module.exports = serverConfig;
