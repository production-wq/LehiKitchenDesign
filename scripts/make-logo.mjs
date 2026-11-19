import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const svg = fs.readFileSync(path.join(root, "src/app/icon.svg"));
await sharp(svg, { density: 600 }).resize(512, 512).png().toFile(path.join(root, "public/logo.png"));
await sharp(svg, { density: 600 }).resize(180, 180).png().toFile(path.join(root, "src/app/apple-icon.png"));
// OG default 1200x630 crop from hero
await sharp(path.join(root, "public/images/hero-home.jpg")).resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 82 }).toFile(path.join(root, "public/images/og-default.jpg"));
console.log("logo + og ok");
