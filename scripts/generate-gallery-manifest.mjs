import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const IMG_RE = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function writeManifest({ dir, basePath, label }) {
  const absDir = path.join(projectRoot, dir);
  const outPath = path.join(absDir, "manifest.json");

  if (!fs.existsSync(absDir)) {
    console.warn(`[${label}] Missing dir: ${absDir}`);
    return;
  }

  const files = fs
    .readdirSync(absDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => IMG_RE.test(name))
    .filter((name) => name.toLowerCase() !== "manifest.json")
    .sort(naturalSort);

  const manifest = {
    generatedAt: new Date().toISOString(),
    basePath,
    files,
  };

  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`[${label}] Wrote ${files.length} files → ${path.relative(projectRoot, outPath)}`);
}

function main() {
  writeManifest({
    dir: path.join("public", "assets", "gallery"),
    basePath: "/assets/gallery/",
    label: "gallery-manifest",
  });

  writeManifest({
    dir: path.join("public", "assets", "corporate-gallery"),
    basePath: "/assets/corporate-gallery/",
    label: "corporate-gallery-manifest",
  });

  writeManifest({
    dir: path.join("public", "assets", "social-gallery"),
    basePath: "/assets/social-gallery/",
    label: "social-gallery-manifest",
  });

  writeManifest({
    dir: path.join("public", "assets", "private-gallery"),
    basePath: "/assets/private-gallery/",
    label: "private-gallery-manifest",
  });

  writeManifest({
    dir: path.join("public", "assets", "electronic-gallery"),
    basePath: "/assets/electronic-gallery/",
    label: "electronic-gallery-manifest",
  });
}

main();

