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


class Boundary {
    constructor(tl, br) {
      this.tl = tl;
      this.br = br;
      this.tr = createVector(br.x, tl.y);
      this.bl = createVector(tl.x, br.y);
      this.w = br.x - tl.x;
      this.h = br.y - tl.y;
      this.pos = createVector(tl.x + (this.w / 2), tl.y + (this.h / 2))
    }
    contains(pt) {
      return (pt.x >= this.tl.x && pt.x <= this.br.x && pt.y >= this.tl.y && pt.y <= this.br.y);
    }
  }