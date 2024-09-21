const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack");
const nodeExternals = require("webpack-node-externals");

const resolve = (_path) => path.resolve(__dirname, _path);

/**@type {import('webpack').WebpackOptionsNormalized} */
const serverConfig = {
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
    // chunkFilename: "[name].chunk.js",
    clean: true,
    publicPath: "/",
    globalObject: "this",
  },
};

module.exports = merge(common, serverConfig);
