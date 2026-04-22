import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const dir = 'public/photos';
const MAX_DIMENSION = 2000;
const QUALITY = 82;

const files = await readdir(dir);
let before = 0, after = 0;

for (const name of files) {
  const src = join(dir, name);
  const info = await stat(src);
  before += info.size;

  const buf = await sharp(src)
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  const outName = name.replace(/\.(png|jpeg|jpg)$/i, '.jpeg');
  const out = join(dir, outName);
  await sharp(buf).toFile(out + '.tmp');

  const { rename, unlink } = await import('node:fs/promises');
  if (outName !== name) await unlink(src);
  await rename(out + '.tmp', out);

  const newInfo = await stat(out);
  after += newInfo.size;
  console.log(`${name} → ${outName}  ${(info.size / 1024).toFixed(0)}KB → ${(newInfo.size / 1024).toFixed(0)}KB`);
}

console.log(`\nTotal: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB  (${((1 - after / before) * 100).toFixed(0)}% smaller)`);
