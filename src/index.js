

const patterns_new = [
  `
  0111
  1100
  1111
  0111
  0101
  `,
  `
  0111
  1100
  1111
  1111
  0101
  `,
  `
  1111
  1100
  1111
  0111
  0101
  `,
  `
  111
  100
  111
  111
  101
  `,
  `
  111
  100
  111
  101
  101
  `,
  `
  0111
  1100
  1111
  0101
  `,
  `
  0111
  1100
  0111
  0101
  `,
  `
  111
  100
  111
  101
  `,
  `
  011
  100
  111
  101
  `,
]

const genVariants = (pattern, { w, h }) => {
  const patterns = [
    pattern,
    pattern.map(({ pos, ...fields }) => ({
      pos: [w - pos[0], pos[1]],
      ...fields
    })),
    pattern.map(({ pos, ...fields }) => ({
      pos: [pos[0], h - pos[1]],
      ...fields
    })),
    pattern.map(({ pos, ...fields }) => ({
      pos: [w - pos[0], h - pos[1]],
      ...fields
    }))
  ]

  for (let pattern of patterns) {
    if (pattern.length !== w * h)
      console.log('pattern with wrong size', [w, h], w * h, pattern.length)
  }

  return patterns.map((pixels) => ({ pixels: pixels.sort(({  pos: a }, { pos: b }) => (b[0] * b[1]) - (a[0] * a[1])), w, h }))
}

const patterns = patterns_new
  .map((p) => {
    const wihtoutSpaces = p.trim().replaceAll(" ", "");
    const width = wihtoutSpaces.indexOf("\n");
    const height = wihtoutSpaces.split("\n").length;
    return {
      w: width,
      h: height,
      pattern: wihtoutSpaces
        .replaceAll("\n", "")
        .split("")
        .reduce(
          (curr, item, index) => [
            ...curr,
            {
              pos: [index % width, Math.floor(index / width)],
              enabled: item === "1"
            }
          ],
          []
        )
    };
  })
  .map(({ w, h, pattern }) => genVariants(pattern, { w, h }))
  .flat()


const img = new Image();
img.crossOrigin = "anonymous";
img.src = "./assets/rplace-1690041639346.png";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.globalAlpha = 1;
ctx.imageSmoothingEnabled = false;
img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const orgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = new Uint32Array(orgPixels.data.buffer)

  const pixelColor = (pixels, x, y) => {
    return pixels[(x + y * canvas.width)];
  };

  const pixelEqual = (a, b) => a === b;
  const foundPatterns = [];

  const patternCheck = (patternPixels, canvaPixels, startX, startY) => {
    let refColor = pixelColor(
      canvaPixels,
      startX + patternPixels[1].pos[0],
      startY + patternPixels[1].pos[1]
    );
    for (let index = 0; index < patternPixels.length; index++) {
      const patternPixel = patternPixels[index];
      const color = pixelColor(
        canvaPixels,
        startX + patternPixel.pos[0],
        startY + patternPixel.pos[1]
      );
      if (patternPixel.enabled && !pixelEqual(color, refColor)) return false;
      if (!patternPixel.enabled && pixelEqual(color, refColor)) return false;
    }
    return true;
  };

 
  const smallestPatternX = 4;
  const smallestPatternY = 4;

  for (let x = 0; x < canvas.width - smallestPatternX; x++) {
    for (let y = 0; y < canvas.height - smallestPatternY; y++) {
      for (let pattern of patterns) {
        if (patternCheck(pattern.pixels, pixels, x, y)) {
          foundPatterns.push({ pos: [x, y], pattern });
          break;
        }
      }
    }
  }


  const start = Date.now();
  ctx.fillStyle = "rgba(1,1,1, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  foundPatterns.forEach(({ pos: start, pattern }) => {
    pattern.pixels.forEach(({ pos, enabled }) => {
      if (enabled) {
        const p = [start[0] + pos[0], start[1] + pos[1]];
        const color = pixelColor(pixels, p[0], p[1]);
        const r = color & 0xff, g = (color & 0xff00)>>>8, b = (color & 0xff0000)>>>16;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(p[0], p[1], 1, 1);
      }
    });
  });
  img.style.display = "none";

  const end = Date.now();


  console.log("took", end - start);
  console.log("found", foundPatterns.length);
};
