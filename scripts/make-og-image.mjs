import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO_W = 620;

const photo = await sharp('public/photos/distinguished.jpeg')
  .resize({ width: PHOTO_W, height: HEIGHT, fit: 'cover', position: 'attention' })
  .toBuffer();

const svg = `
<svg width="${WIDTH - PHOTO_W}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf8f2"/>
      <stop offset="100%" stop-color="#f4ecdf"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>

  <text x="56" y="130" font-family="Georgia, serif" font-weight="600" font-size="18" fill="#b55a3e" letter-spacing="5">A VERY SERIOUS ARCHIVE</text>

  <text x="56" y="240" font-family="Georgia, serif" font-weight="bold" font-size="78" fill="#2a211a">Mr. Howard</text>
  <text x="56" y="328" font-family="Georgia, serif" font-weight="bold" font-size="78" fill="#2a211a">Snaps</text>
  <text x="280" y="322" font-family="Georgia, serif" font-size="44" fill="#e6b35a">✦</text>

  <text x="56" y="410" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#564537">The goodest boy.</text>
  <text x="56" y="450" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#564537">The coziest companion.</text>

  <line x1="56" y1="530" x2="130" y2="530" stroke="#b55a3e" stroke-width="2"/>
  <text x="56" y="570" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#b55a3e" letter-spacing="3">MRHOWARDSNAPS.COM</text>
</svg>`;

const right = await sharp(Buffer.from(svg)).png().toBuffer();

await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 3, background: '#fdf8f2' },
})
  .composite([
    { input: photo, left: 0, top: 0 },
    { input: right, left: PHOTO_W, top: 0 },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log('Wrote public/og-image.jpg');
