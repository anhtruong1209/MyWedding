/**
 * Nhập một album ảnh gốc vào site: đổi tên gọn, resize, nén WebP.
 *
 *   node scripts/import-photos.mjs --src _originals/congai --album baby
 *
 * Ảnh gốc nằm ngoài repo (_originals/ đã được .gitignore), chỉ bản WebP đã nén
 * mới đi vào public/ và được commit. Nhờ vậy git không bao giờ phình theo ảnh.
 *
 * Ảnh xuất ra được đánh số 01, 02, ... theo thứ tự tên file gốc.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MAX_WIDTH = 2000;
const QUALITY = 82;
const MIN_QUALITY = 65;

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? null : process.argv[i + 1];
}

/** Ảnh nhiều chi tiết có thể cho WebP to hơn JPEG gốc; hạ dần chất lượng cho tới khi thật sự nhỏ hơn. */
async function encodeSmaller(file, srcBytes) {
  let q = QUALITY;
  let last = null;
  while (q >= MIN_QUALITY) {
    const buf = await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: q, effort: 6 })
      .toBuffer();
    if (buf.length < srcBytes) return { buf, quality: q };
    last = { buf, quality: q };
    q -= 6;
  }
  return last;
}

async function main() {
  const src = arg("src");
  const album = arg("album");
  if (!src || !album) {
    console.error("Thiếu tham số.\n  node scripts/import-photos.mjs --src <thư-mục-ảnh-gốc> --album <tên-album>");
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), "public", "images", album);
  await fs.mkdir(outDir, { recursive: true });

  const entries = await fs.readdir(src);
  const photos = entries.filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();

  if (photos.length === 0) {
    console.error(`Không tìm thấy ảnh nào trong ${src}`);
    process.exit(1);
  }

  const pad = String(photos.length).length;
  let before = 0;
  let after = 0;

  for (const [i, name] of photos.entries()) {
    const file = path.join(src, name);
    const srcBytes = (await fs.stat(file)).size;
    const outName = `${String(i + 1).padStart(pad, "0")}.webp`;

    const { buf, quality } = await encodeSmaller(file, srcBytes);
    await fs.writeFile(path.join(outDir, outName), buf);

    before += srcBytes;
    after += buf.length;
    const note = quality < QUALITY ? ` (khó nén, hạ xuống q${quality})` : "";
    console.log(
      `${(srcBytes / 1024).toFixed(0).padStart(5)} KB -> ${(buf.length / 1024).toFixed(0).padStart(5)} KB  ${album}/${outName}${note}`,
    );
  }

  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log(
    `\n${photos.length} ảnh: ${mb(before)} MB -> ${mb(after)} MB (giảm ${(100 - (after / before) * 100).toFixed(0)}%)`,
  );
  console.log(`Đã ghi vào public/images/${album}/  —  ảnh gốc trong ${src} không bị đụng tới.`);
}

main().catch((err) => {
  console.error("Nhập ảnh thất bại:", err);
  process.exit(1);
});
