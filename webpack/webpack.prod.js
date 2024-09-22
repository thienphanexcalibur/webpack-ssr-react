const { default: merge } = require("webpack-merge");

const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const clientConfig = require("./webpack.client.js");
const serverConfig = require("./webpack.server.js");

const client = merge(clientConfig, {
  plugins: [new WebpackManifestPlugin()],
});

const server = merge(serverConfig, {
  dependencies: ["client"],
});

module.exports = [server, client];
