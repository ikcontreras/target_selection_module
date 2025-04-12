const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

esbuild
  .build({
    entryPoints: ["src/app.ts"],
    bundle: true,
    platform: "node",
    target: "node22",
    outfile: "dist/target_selection_module.js",
    minify: true,
    sourcemap: false,
    metafile: true,
    alias: {
      "@types": path.resolve(__dirname, "src/types"),
    },
  })
  .then((result) => {
    fs.writeFileSync(
      path.resolve(__dirname, "dist/metadata.json"),
      JSON.stringify(result.metafile, null, 2),
    );
    console.log("📦 Bundle completed. Metadata written to dist/metadata.json");
  })
  .catch(() => process.exit(1));
