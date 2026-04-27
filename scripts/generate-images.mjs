import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "public", "saintjoseph.png");

const iconOut = path.join(root, "app", "icon.png");
const appleOut = path.join(root, "app", "apple-icon.png");
const ogOut = path.join(root, "app", "opengraph-image.jpg");

const meta = await sharp(src).metadata();
const { width, height } = meta;
console.log(`source: ${width}x${height}`);

// Square crop from the top — captures head, raised hand, Christ child, upper torso.
const squareSize = Math.min(width, height);
const squareLeft = Math.round((width - squareSize) / 2);
const squareTop = 0;

const squareBuffer = await sharp(src)
  .extract({ left: squareLeft, top: squareTop, width: squareSize, height: squareSize })
  .toBuffer();

await sharp(squareBuffer).resize(512, 512).png({ compressionLevel: 9 }).toFile(iconOut);
console.log(`wrote ${iconOut} (512x512)`);

await sharp(squareBuffer).resize(180, 180).png({ compressionLevel: 9 }).toFile(appleOut);
console.log(`wrote ${appleOut} (180x180)`);

// OG image: 1200x630. Source is portrait, so cover-crop loses too much.
// Use blurred cover background + contained foreground for a polished look.
const ogW = 1200;
const ogH = 630;

const background = await sharp(src)
  .resize(ogW, ogH, { fit: "cover", position: "attention" })
  .blur(40)
  .modulate({ brightness: 0.6 })
  .toBuffer();

const foreground = await sharp(src)
  .resize({ height: ogH, fit: "contain" })
  .toBuffer();

await sharp(background)
  .composite([{ input: foreground, gravity: "center" }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(ogOut);
console.log(`wrote ${ogOut} (1200x630)`);
