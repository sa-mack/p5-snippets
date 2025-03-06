let POS;
function setup() {
  const dimensionless = min(windowWidth, windowHeight);
  createCanvas(dimensionless, dimensionless);
  ellipseMode(RADIUS);
  rectMode(CORNERS);
  angleMode(DEGREES);
  background(0);
  stroke(255);
  strokeWeight(2);

  POS = createVector(width / 2, height / 2)

  let density = 50;
  let margin = width * 0.1;
  let xSpace = (width - margin * 2) / density;
  let ySpace = (height - margin * 2) / density;

  for (let x = margin; x < width - margin; x += xSpace) {
    for (let y = margin; y < height - margin; y += ySpace) {
      const bounds = {
        tl: createVector(x, y),
        tr: createVector(x + xSpace, y),
        br: createVector(x + xSpace, y + ySpace),
        bl: createVector(x, y + ySpace),
      };
    }
  }
}
