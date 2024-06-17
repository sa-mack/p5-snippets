let CELLS = [];
function setup() {
  createCanvas(800, 800);
  background(220);
  rectMode(CORNERS);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  fill(0);
  
  let TL = createVector(0, 0);
  let BR = createVector(width, height);
  let qt = new QuadTree(TL, BR, 1); 
  let r = 400;
  let randomPt = createVector(random(width), random(height));
  for (let i = 0; i < 100; i++) {
    let a = floor(random(360));
    let x = randomPt.x + cos(a) * random(r);
    let y = randomPt.y + sin(a) * random(r);
    qt.insert(createVector(x, y));
  }
  qt.drawCells(1);
  let ARR = [];
  qt.occupiedCellsArray(ARR);
}

class QuadTree {
  constructor(tl, br, capacity) {
    this.bounds = new Boundary(tl, br);
    this.capacity = capacity;
    this.pts = [];
    this.cells = [];
    this.divided = false;
    this.centerPos = createVector((this.bounds.br.x - this.bounds.tl.x) / 2, 
                                  (this.bounds.br.y - this.bounds.tl.y) / 2);
    this.w = (this.bounds.br.x - this.bounds.tl.x);
    this.h = (this.bounds.br.y - this.bounds.tl.y);
  }

  drawCells(im = 0) {
    if (!this.divided) {
      rect(this.bounds.tl.x + im, this.bounds.tl.y + im, this.bounds.br.x - im, this.bounds.br.y - im, 5);
    } else {
      this.tl.drawCells(im);
      this.tr.drawCells(im);
      this.br.drawCells(im);
      this.bl.drawCells(im);
    }
  }

  allCellsArray(arr) {
    if (!this.divided) {
      arr.push(this.bounds);
    } else {
      this.tl.allCellsArray(arr);
      this.tr.allCellsArray(arr);
      this.br.allCellsArray(arr);
      this.bl.allCellsArray(arr);
    }
  }

  occupiedCellsArray(arr) {
    if (!this.divided && this.pts.length > 0) {
      arr.push(this.bounds);
    } else if (this.divided){
      this.tl.occupiedCellsArray(arr);
      this.tr.occupiedCellsArray(arr);
      this.br.occupiedCellsArray(arr);
      this.bl.occupiedCellsArray(arr);
    }
  }

  insert(pt) {
    if (!this.bounds.contains(pt)) {
      return;
    }
    if (this.pts.length < this.capacity) {
      this.pts.push(pt);
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      this.tl.insert(pt);
      this.tr.insert(pt);
      this.br.insert(pt);
      this.bl.insert(pt);
    }
  }

  subdivide() {
    let cx = (this.bounds.tl.x + this.bounds.br.x) / 2;
    let cy = (this.bounds.tl.y + this.bounds.br.y) / 2;

    const TL = new Boundary(
      this.bounds.tl,
      createVector(cx, cy)
    );

    const TR = new Boundary(
      createVector(cx, this.bounds.tl.y),
      createVector(this.bounds.br.x, cy)
    );

    const BR = new Boundary(
       createVector(cx, cy),
       this.bounds.br
    );

    const BL = new Boundary(
       createVector(this.bounds.tl.x, cy),
       createVector(cx, this.bounds.br.y)
    );

    this.tl = new QuadTree(TL.tl, TL.br, this.capacity);
    this.tr = new QuadTree(TR.tl, TR.br, this.capacity);
    this.br = new QuadTree(BR.tl, BR.br, this.capacity);
    this.bl = new QuadTree(BL.tl, BL.br, this.capacity);
    this.divided = true;
  }
}

class Boundary {
  constructor(tl, br) {
    this.tl = tl;
    this.br = br;
    this.w = br.x - tl.x;
    this.h = br.y - tl.y;
  }
  
  contains(pt) {
    return (pt.x > this.tl.x &&
            pt.x < this.br.x &&
            pt.y > this.tl.y &&
            pt.y < this.br.y);
  }
}
