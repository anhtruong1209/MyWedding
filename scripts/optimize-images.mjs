/**
 * Nén ảnh trong public/images sang WebP.
 *
 * Chạy:  npm run images:optimize          -> tạo .webp, giữ nguyên file gốc
 *        npm run images:optimize -- --replace  -> tạo .webp rồi xoá file gốc
 *
 * Ảnh gốc từ thợ chụp phải được giữ ở nơi khác (ổ cứng/Drive). Nén là một chiều.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const REPLACE = process.argv.includes("--replace");

/**
 * Chiều rộng tối đa theo mục đích hiển thị, không phải theo cảm tính:
 * - background/slider: trải hết bề ngang màn hình -> cần rộng nhất.
 * - gallery/story/baby: hiển thị lớn nhất trong Lightbox (min(92vw,1100px), 76vh),
 *   2000px thừa sức cho màn 2K ở mật độ 2x.
 * - misc: ảnh chân dung nhỏ trong các section.
 */
const RULES = [
  { dir: "background", maxWidth: 2560, quality: 80 },
  { dir: "slider", maxWidth: 2560, quality: 80 },
  { dir: "gallery", maxWidth: 2000, quality: 82 },
  { dir: "story", maxWidth: 2000, quality: 82 },
  { dir: "baby", maxWidth: 2000, quality: 82 },
  { dir: "misc", maxWidth: 1600, quality: 82 },
];

const FALLBACK = { maxWidth: 1600, quality: 82 };

/** Ảnh phải giữ từng pixel: mã QR quét bằng camera, logo/icon có nền trong suốt. */
const LOSSLESS = /(^ui\/|qrcode|logo|map-marker|hearts)/i;

/** Favicon phải ở lại dạng PNG để trình duyệt hiểu. */
const FAVICON = "icon1.png";

/** Dưới mức này ảnh bắt đầu thấy rõ vết nén, không hạ thêm nữa. */
const MIN_QUALITY = 65;

function ruleFor(relPath) {
  const top = relPath.split("/")[0];
  return RULES.find((r) => r.dir === top) ?? FALLBACK;
}

/**
 * Ảnh chi tiết dày đặc (thảm hoa văn, tán lá, hạt nhiễu) có thể cho ra WebP TO HƠN
 * ảnh JPEG gốc — WebP nén kém ở nội dung tần số cao. Nên hạ dần chất lượng cho tới
 * khi thật sự nhỏ hơn, thay vì tin tưởng một mức quality cố định.
 */
async function encodeSmaller(file, maxWidth, quality, srcBytes) {
  let q = quality;
  let best = null;

  while (q >= MIN_QUALITY) {
    const buf = await sharp(file)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: q, effort: 6 })
      .toBuffer();

    if (buf.length < srcBytes) return { buf, quality: q };
    best = { buf, quality: q };
    q -= 6;
  }

  return best;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : Promise.resolve([full]);
    }),
  );
  return files.flat();
}

const kb = (bytes) => (bytes / 1024).toFixed(0).padStart(5) + " KB";

async function main() {
  const all = await walk(ROOT);
  const targets = all.filter((f) => /\.(jpe?g|png)$/i.test(f));

  if (targets.length === 0) {
    console.log("Không tìm thấy ảnh JPG/PNG nào trong public/images.");
    return;
  }

  let before = 0;
  let after = 0;
  const removable = [];
  const stubborn = [];

  for (const file of targets) {
    const rel = path.relative(ROOT, file).split(path.sep).join("/");
    const srcBytes = (await fs.stat(file)).size;
    before += srcBytes;

    // Favicon: giữ PNG cho trình duyệt hiểu, nhưng giảm bảng màu — icon không cần 24-bit.
    if (rel === FAVICON) {
      const buf = await sharp(file)
        .resize({ width: 256, withoutEnlargement: true })
        .png({ palette: true, compressionLevel: 9 })
        .toBuffer();
      await fs.writeFile(file, buf);
      after += buf.length;
      console.log(`${kb(srcBytes)} -> ${kb(buf.length)}  ${rel}  (favicon, PNG bảng màu)`);
      continue;
    }

    const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const lossless = LOSSLESS.test(rel);
    const { maxWidth, quality } = ruleFor(rel);

    let buf;
    let tag;
    if (lossless) {
      buf = await sharp(file).resize({ width: maxWidth, withoutEnlargement: true }).webp({ lossless: true }).toBuffer();
      tag = "lossless";
    } else {
      const enc = await encodeSmaller(file, maxWidth, quality, srcBytes);
      buf = enc.buf;
      tag = `${maxWidth}px q${enc.quality}`;
      if (enc.quality < quality) tag += " (ảnh khó nén, đã hạ chất lượng)";
    }

    if (buf.length >= srcBytes) {
      stubborn.push(rel);
      tag += " — KHÔNG nhỏ hơn ảnh gốc";
    }

    await fs.writeFile(out, buf);
    after += buf.length;
    removable.push(file);

    console.log(`${kb(srcBytes)} -> ${kb(buf.length)}  ${rel}  (${tag})`);
  }

  if (REPLACE) {
    await Promise.all(removable.map((f) => fs.unlink(f)));
    console.log(`\nĐã xoá ${removable.length} file gốc.`);
  }

  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log(
    `\nTổng: ${mb(before)} MB -> ${mb(after)} MB  (giảm ${(100 - (after / before) * 100).toFixed(0)}%)`,
  );

  if (stubborn.length > 0) {
    console.log(`\nCảnh báo: ${stubborn.length} ảnh không nén nhỏ hơn được, nên xem lại thủ công:`);
    for (const f of stubborn) console.log(`  - ${f}`);
  }

  if (!REPLACE) {
    console.log("\nFile gốc vẫn còn. Chạy lại với --replace để xoá sau khi đã kiểm tra.");
  }
}

main().catch((err) => {
  console.error("Nén ảnh thất bại:", err);
  process.exit(1);
});
