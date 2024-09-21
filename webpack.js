const path = require("path");
const resolve = (_path) => path.resolve(__dirname, _path);

/**@type {import('webpack').WebpackOptionsNormalized} */
const config = {
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".wasm", ".json", ".node"],
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
        use: ["css-loader"],
      },
    ],
  },
};

module.exports = config;
