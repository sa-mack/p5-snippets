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

  POS = createVector(width / 2, height / 2);
}

