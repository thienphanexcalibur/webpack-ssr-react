const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const resolve = (_path) => path.resolve(__dirname, _path);

/**@type {import('webpack').WebpackOptionsNormalized} */
const serverConfig = {
  name: "server",
  entry: {
    server: {
      import: resolve("../server/index.tsx"),
      filename: "[name].js",
    },
  },
  output: {
    path: resolve("../dist/server"),
    chunkFilename: "[chunkhash:4].chunk.js",
    clean: true,
    publicPath: "/",
    globalObject: "this",
  },

  externalsPresets: {
    node: true,
  },
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "esbuild-loader",
          options: {
            target: "node20",
            keepNames: true,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
};

module.exports = merge(common, serverConfig);
