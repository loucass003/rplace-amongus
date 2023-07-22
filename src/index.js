const img = new Image();
img.crossOrigin = "anonymous";
img.src = "./assets/rplace-1689987395883.png";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1500;
canvas.height = 1000;
ctx.globalAlpha = 1;
ctx.imageSmoothingEnabled = false;

const amogus = [
  { pos: [0, 0], enabled: 0 },
  { pos: [1, 0], enabled: 1 },
  { pos: [2, 0], enabled: 1 },
  { pos: [3, 0], enabled: 1 },
  { pos: [0, 1], enabled: 1 },
  { pos: [1, 1], enabled: 1 },
  { pos: [3, 1], enabled: 0 },
  { pos: [2, 1], enabled: 0 },
  { pos: [0, 2], enabled: 1 },
  { pos: [1, 2], enabled: 1 },
  { pos: [2, 2], enabled: 1 },
  { pos: [3, 2], enabled: 1 },
  { pos: [1, 3], enabled: 1 },
  { pos: [2, 3], enabled: 1 },
  { pos: [3, 3], enabled: 1 },
  { pos: [1, 4], enabled: 1 },
  { pos: [3, 4], enabled: 1 },
  { pos: [0, 3], enabled: 0 },
  { pos: [0, 4], enabled: 0 },
  { pos: [2, 4], enabled: 0 }
];

const amogus2 = [
  { pos: [0, 0], enabled: 0 },
  { pos: [1, 0], enabled: 1 },
  { pos: [2, 0], enabled: 1 },
  { pos: [3, 0], enabled: 1 },
  { pos: [0, 1], enabled: 1 },
  { pos: [1, 1], enabled: 1 },
  { pos: [2, 1], enabled: 0 },
  { pos: [3, 1], enabled: 0 },
  { pos: [0, 2], enabled: 1 },
  { pos: [1, 2], enabled: 1 },
  { pos: [2, 2], enabled: 1 },
  { pos: [3, 2], enabled: 1 },
  { pos: [0, 3], enabled: 0 },
  { pos: [1, 3], enabled: 1 },
  { pos: [2, 3], enabled: 0 },
  { pos: [3, 3], enabled: 1 }
];

const amogus3 = [
  { pos: [1, 0], enabled: 1 },
  { pos: [2, 0], enabled: 1 },
  { pos: [3, 0], enabled: 1 },
  { pos: [0, 1], enabled: 1 },
  { pos: [0, 2], enabled: 1 },
  { pos: [0, 3], enabled: 1 },
  { pos: [1, 1], enabled: 1 },
  { pos: [1, 2], enabled: 1 },
  { pos: [2, 2], enabled: 1 },
  { pos: [3, 2], enabled: 1 },
  { pos: [1, 3], enabled: 1 },
  { pos: [2, 3], enabled: 1 },
  { pos: [3, 3], enabled: 1 },
  { pos: [1, 4], enabled: 1 },
  { pos: [3, 4], enabled: 1 },
  { pos: [0, 0], enabled: 0 },
  { pos: [2, 1], enabled: 0 },
  { pos: [3, 1], enabled: 0 },
  { pos: [0, 4], enabled: 0 },
  { pos: [2, 4], enabled: 0 }
];

const amogus4 = [
  { pos: [1, 0], enabled: 1 },
  { pos: [2, 0], enabled: 1 },
  { pos: [3, 0], enabled: 1 },
  { pos: [0, 0], enabled: 0 },
  { pos: [0, 1], enabled: 1 },
  { pos: [1, 1], enabled: 1 },
  { pos: [2, 1], enabled: 0 },
  { pos: [3, 1], enabled: 0 },
  { pos: [0, 2], enabled: 1 },
  { pos: [1, 2], enabled: 1 },
  { pos: [2, 2], enabled: 1 },
  { pos: [3, 2], enabled: 1 },
  { pos: [0, 3], enabled: 1 },
  { pos: [1, 3], enabled: 1 },
  { pos: [2, 3], enabled: 1 },
  { pos: [3, 3], enabled: 1 },
  { pos: [0, 4], enabled: 0 },
  { pos: [1, 4], enabled: 1 },
  { pos: [2, 4], enabled: 1 },
  { pos: [3, 4], enabled: 1 },
  { pos: [1, 5], enabled: 1 },
  { pos: [3, 5], enabled: 1 },
  { pos: [0, 5], enabled: 0 },
  { pos: [2, 5], enabled: 0 }
];

const amogus5 = [
  { pos: [0, 0], enabled: 0 },
  { pos: [1, 0], enabled: 1 },
  { pos: [2, 0], enabled: 1 },
  { pos: [3, 0], enabled: 1 },
  { pos: [0, 1], enabled: 0 },
  { pos: [1, 1], enabled: 1 },
  { pos: [2, 1], enabled: 0 },
  { pos: [3, 1], enabled: 0 },
  { pos: [0, 2], enabled: 1 },
  { pos: [1, 2], enabled: 1 },
  { pos: [2, 2], enabled: 1 },
  { pos: [3, 2], enabled: 1 },
  { pos: [0, 3], enabled: 1 },
  { pos: [1, 3], enabled: 1 },
  { pos: [2, 3], enabled: 1 },
  { pos: [3, 3], enabled: 1 },
  { pos: [0, 4], enabled: 0 },
  { pos: [1, 4], enabled: 1 },
  { pos: [2, 4], enabled: 1 },
  { pos: [3, 4], enabled: 1 },
  { pos: [1, 5], enabled: 1 },
  { pos: [3, 5], enabled: 1 },
  { pos: [0, 5], enabled: 0 },
  { pos: [2, 5], enabled: 0 }
];


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

const patterns = [
  ...genVariants(amogus, { w: 4, h: 5 }),
  ...genVariants(amogus2, { w: 4, h: 4 }),
  ...genVariants(amogus3, { w: 4, h: 5 }),
  ...genVariants(amogus4, { w: 4, h: 6 }),
  ...genVariants(amogus5, { w: 4, h: 6 }),
];


function canvasToRLE(pixels) {
  let rleData = [];
  let currentPixel = null;
  let count = 0;

  for (let i = 0; i < pixels.length; i += 1) {
    const pixel = pixels[i];

    if (currentPixel === null) {
      // First pixel encountered
      currentPixel = pixel;
      count = 1;
    } else if (pixel === currentPixel) {
      // Same pixel as before, increase count
      count++;
    } else {
      // Different pixel, add the run to the RLE data
      rleData.push([currentPixel, count]);
      currentPixel = pixel;
      count = 1;
    }
  }

  // Add the last run to the RLE data
  if (currentPixel !== null) {
    rleData.push([currentPixel, count]);
  }

  return rleData;
}

// Helper function to check if two arrays are equal
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


img.onload = function () {
  const start = Date.now();
  ctx.drawImage(img, 0, 0);
  const orgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = new Uint32Array(orgPixels.data.buffer)

  console.log(canvasToRLE(pixels).filter(([color, count]) => count >= 5).reduce((curr, [color, count]) => curr + count, 0));

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

 
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      for (let pattern of patterns) {
        if (patternCheck(pattern.pixels, pixels, x, y)) {
          foundPatterns.push({ pos: [x, y], pattern });
          break;
        }
      }
    }
  }


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
