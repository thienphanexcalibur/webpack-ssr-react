import App from "root/client/entry";
import webpack from "webpack";
import express, { Response } from "express";
import { renderToString } from "react-dom/server";
import middleware, { ExtendedServerResponse } from "webpack-dev-middleware";

import path from "path";
import fs from "fs";

function normalizeAssets(assets: any) {
  if (Object.prototype.toString(assets) === "[object Object]") {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}

// development
if (__mode__ === "development") {
  const config = require("../webpack/webpack.client.js");

  const app = express();

  const compiler = webpack(config);

  app.use(middleware(compiler, { serverSideRender: true }));

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
}

if (__mode__ === "production") {
  const manifestPath = path.join(process.cwd(), "./dist/client/manifest.json");

  const manifest = JSON.parse(fs.readFileSync(manifestPath).toString());

  const app = express();

  app.use(express.static(path.resolve(process.cwd(), "./dist/client")));

  const initialChunks = Object.keys(manifest).filter((item) =>
    item.match(/^entry/)
  );

  app.use((req, res) => {
    const html = `
        <html>
        <head>
        <title>My App</title>
        ${normalizeAssets(initialChunks)
          .filter((path) => path.endsWith(".css"))
          .map(
            (item) =>
              `<style type="text/css">${fs
                .readFileSync(
                  path.join(process.cwd(), `dist/client/${manifest[item]}`)
                )
                .toString()}</style>`
          )}
      </head>
      <body>
    <div id="app">${renderToString(<App />)}</div>
        ${normalizeAssets(initialChunks)
          .filter((item) => item.endsWith(".js"))
          .map((item) => `<script src="${manifest[item]}"></script>`)
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
}
