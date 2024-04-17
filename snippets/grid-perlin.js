function setup() {
    const dimensionless = min(windowWidth, windowHeight);
    createCanvas(dimensionless, dimensionless);
    angleMode(DEGREES)
    background(0);
    stroke(255);
    let sf = 0.005;
  
    let density = 50;
    let margin = width * 0.1;
    let xSpace = (width - (margin * 2)) / density;
    let ySpace = (height - (margin * 2)) / density;
  
    for (let x = margin; x < width - margin; x += xSpace) {
      for (let y = margin; y < height - margin; y += ySpace) {
          let angle = map(noise(x * sf, y * sf), 0, 1, 0, 720);
          let endX = cos(angle) * xSpace;
          let endY = sin(angle) * ySpace;
          line(x,y, x + endX, y + endY)
      }
    }
  }
  