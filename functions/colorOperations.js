function replaceColor(hexPalette) {
    const RGBPalette = [];
  
    for (let i = 0; i < hexPalette.length; i++) {
      RGBPalette.push(hexToRGB(hexPalette[i]));
    }
  
    loadPixels();
  
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
  
      const closestColor = getColor(r, g, b, RGBPalette);
  
      pixels[i] = closestColor.r;
      pixels[i + 1] = closestColor.g;
      pixels[i + 2] = closestColor.b;
    }
  
    updatePixels();
  }
  
  function replaceBufferColor(b, hexPalette) {
    const RGBPalette = [];
  
    for (let i = 0; i < hexPalette.length; i++) {
      RGBPalette.push(hexToRGB(hexPalette[i]));
    }
  
    b.loadPixels();
  
    for (let i = 0; i < b.pixels.length; i += 4) {
      const rClr = b.pixels[i];
      const gClr = b.pixels[i + 1];
      const bClr = b.pixels[i + 2];
  
      const closestColor = getColor(rClr, gClr, bClr, RGBPalette);
  
      b.pixels[i] = closestColor.r;
      b.pixels[i + 1] = closestColor.g;
      b.pixels[i + 2] = closestColor.b;
    }
  
    b.updatePixels();
  }
  
  function getColor(r, g, b, palette) {
    let closestDistance = Infinity;
    let closestClr = null;
  
    for (let clr of palette) {
      const distance = euDist(r, g, b, clr.r, clr.g, clr.b);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestClr = clr;
      }
    }
  
    return closestClr;
  }
  
  function euDist(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(
      Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
    );
  }
  
  function componentToHex(c) {
    const hx = c.toString(16);
    return hx.length == 1 ? "0" + hx : hx;
  }
  
  function RGBToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  function hexToRGB(hx) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hx);
    return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  
  function hexToRGBArray(hx) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hx);
    return result ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  }

  //refactor for easier use (pass remainColor as hex?) (why didn't noise work?)
  // rn, pass remainColor as []. hexToRGB returns annoying object
  

  function chaosReplacer(remainColor, colorOptions) {
    const RGBPalette = [];
  console.log(remainColor)
    for (let i = 0; i < colorOptions.length; i++) {
      RGBPalette.push(hexToRGB(colorOptions[i]));
    }
  
    loadPixels();
  
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      if (
        r == remainColor[0] &&
        g == remainColor[1] &&
        b == remainColor[2]
      ) {
      continue;
      }
      
      let clr = random(RGBPalette)
      
      
  
      
      pixels[i] = clr.r;
      pixels[i + 1] = clr.g;
      pixels[i + 2] = clr.b;
      
  
    }
  
    updatePixels();
  }

  function replaceOne(replaceColor, colorOptions) {
    const RGBPalette = [];
    for (let i = 0; i < colorOptions.length; i++) {
      RGBPalette.push(hexToRGB(colorOptions[i]));
    }
  
    loadPixels();
  
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      if (
        r == replaceColor[0] &&
        g == replaceColor[1] &&
        b == replaceColor[2]
      ) {
        let clr = random(RGBPalette);

        pixels[i] = clr.r;
        pixels[i + 1] = clr.g;
        pixels[i + 2] = clr.b;
      }
      
  
    }
  
    updatePixels();
  }

