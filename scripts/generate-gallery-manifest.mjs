import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const galleryDir = path.join(projectRoot, "public", "assets", "gallery");
const outPath = path.join(galleryDir, "manifest.json");

const IMG_RE = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function main() {
  if (!fs.existsSync(galleryDir)) {
    console.warn(`[gallery-manifest] Missing dir: ${galleryDir}`);
    process.exit(0);
  }

  const files = fs
    .readdirSync(galleryDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => IMG_RE.test(name))
    .filter((name) => name.toLowerCase() !== "manifest.json")
    .sort(naturalSort);

  const manifest = {
    generatedAt: new Date().toISOString(),
    basePath: "/assets/gallery/",
    files,
  };

  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`[gallery-manifest] Wrote ${files.length} files → ${path.relative(projectRoot, outPath)}`);
}

main();

