import App from "@/client/entry";
import webpack from "webpack";
import express, { Response } from "express";
import { renderToString } from "react-dom/server";
import middleware, { ExtendedServerResponse } from "webpack-dev-middleware";

const config = require("../../webpack.client.dev.js");

const app = express();

const compiler = webpack(config);

app.use(middleware(compiler, { serverSideRender: true }));

// compiler.compile((err, res) => {
//   res?.getStats();
//   res?.compiler.outputFileSystem
// });

function normalizeAssets(assets: any) {
  if (Object.prototype.toString(assets) === "[object Object]") {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}

app.use((req, res: Response & ExtendedServerResponse) => {
  const { devMiddleware } = res.locals?.webpack!;
  const outputFileSystem = devMiddleware!.outputFileSystem;
  const jsonWebpackStats = devMiddleware!.stats!.toJson();
  const { assetsByChunkName, outputPath } = jsonWebpackStats;

  const html = `
    <html>
    <head>
    <title>My App</title>
    ${normalizeAssets(assetsByChunkName?.entry)
      .filter((path) => path.endsWith(".css"))
      .map(
        (item) =>
          `<style type="text/css">${outputFileSystem
            .readFileSync(`${outputPath}/${item}`)
            .toString()}</style>`
      )}
  </head>
  <body>
<div id="app">${renderToString(<App />)}</div>
    ${normalizeAssets(assetsByChunkName?.entry)
      .filter((path) => path.endsWith(".js"))
      .map((path) => `<script src="${path}"></script>`)
      .join("\n")}
  </body>
</html>
  `;
  res.send(html);
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`SSR server is up: http://127.0.0.1:${PORT}`)
);
