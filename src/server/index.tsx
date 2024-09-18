import App from "@/client/entry";
import webpack from "webpack";
import express from "express";
import { renderToString } from "react-dom/server";
import middleware from "webpack-dev-middleware";

const config = require("../../webpack.client.dev.js");

const app = express();

const compiler = webpack(config);

app.use(middleware(compiler, { serverSideRender: true }));

function normalizeAssets(assets) {
  if (Object.prototype.toString(assets) === "[object Object]") {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}

app.use((req, res) => {
  const { devMiddleware } = res.locals.webpack;
  const outputFileSystem = devMiddleware.outputFileSystem;
  const jsonWebpackStats = devMiddleware.stats.toJson();
  const { assetsByChunkName, outputPath } = jsonWebpackStats;
  res.send(`
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
<div id="app">${renderToString(<App />)}</div>
    ${normalizeAssets(assetsByChunkName.client)
      .filter((path) => path.endsWith(".js"))
      .map((path) => `<script src="${path}"></script>`)
      .join("\n")}
  </body>
</html>
  `);
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`SSR server is up: http://127.0.0.1:${PORT}`)
);
