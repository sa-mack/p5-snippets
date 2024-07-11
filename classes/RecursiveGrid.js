class RecursiveGrid {
  constructor(tl, br) {
    this.rects = [];
    this.tl = tl;
    this.br = br;
  }
  spliceTop(margin = this.tl.x) {
    let temp = [];
    for (let i = 0; i < this.rects.length; i++) {
      if (this.rects[i].tl.y > margin) {
        temp.push(this.rects[i]);
      }
    }
    this.rects = temp;
  }
  spliceBottom(margin = this.tl.x) {
    let temp = [];
    for (let i = 0; i < this.rects.length; i++) {
      if (this.rects[i].br.y < height - margin) {
        temp.push(this.rects[i]);
      }
    }
    this.rects = temp;
  }

  spliceRight(margin = this.tl.x) {
    let temp = [];
    for (let i = 0; i < this.rects.length; i++) {
      if (this.rects[i].br.x != width - margin) {
        temp.push(this.rects[i]);
      }
    }
    this.rects = temp;
  }
  spliceLeft(margin = this.tl.x) {
    let temp = [];
    for (let i = 0; i < this.rects.length; i++) {
      if (this.rects[i].tl.x > margin) {
        temp.push(this.rects[i]);
      }
    }
    this.rects = temp;
  }
  generate(depth) {
    this.rects = [];
    this._subdivide(this.tl, this.br, depth);
    return this.rects;
  }
  mergeVerticalCandidates() {
    for (let i = 0; i < this.rects.length - 2; i++) {
      if (
        this.rects[i].bl.x == this.rects[i + 1].tl.x &&
        this.rects[i].bl.y == this.rects[i + 1].tl.y &&
        this.rects[i].br.y == this.rects[i + 1].tr.y &&
        this.rects[i].br.x == this.rects[i + 1].tr.x
      ) {
        let newRect = new Boundary(this.rects[i].tl, this.rects[i + 1].br);
        this.rects.splice(i, 2, newRect);
      }
    }
  }

  mergeHorizontalCandidates() {
    for (let i = 0; i < this.rects.length - 2; i++) {
      if (
        this.rects[i].tr.x == this.rects[i + 1].tl.x &&
        this.rects[i].tr.y == this.rects[i + 1].tl.y &&
        this.rects[i].br.y == this.rects[i + 1].bl.y &&
        this.rects[i].br.x == this.rects[i + 1].bl.x
      ) {
        let newRect = new Boundary(this.rects[i].tl, this.rects[i + 1].br);
        this.rects.splice(i, 2, newRect);
      }
    }
  }

  _subdivide(tl, br, depth) {
    if (depth <= 0) {
      return;
    }
    let w = br.x - tl.x;
    let h = br.y - tl.y;

    let direction; // 0 vert, 1 horiz
    if (w > h) {
      direction = 0;
    } else if (h > w) {
      direction = 1;
    } else {
      direction = floor(random(2));
    }

    let firstBR, secondTL;

    if (direction == 0) {
      let nextW = floor(random(w * 0.35, w * 0.65));
      firstBR = createVector(floor(tl.x + nextW), br.y);
      secondTL = createVector(floor(tl.x + nextW), tl.y);
    } else {
      let nextH = floor(random(h * 0.35, h * 0.65));
      firstBR = createVector(br.x, floor(tl.y + nextH));
      secondTL = createVector(tl.x, floor(tl.y + nextH));
    }

    let skipChance = floor(random(5));

    if (depth > 2 && skipChance == 0) {
      depth -= random([1]);
    }

    this._subdivide(tl, firstBR, depth - 1);
    this._subdivide(secondTL, br, depth - 1);

    if (depth == 1) {
      this.rects.push(new Boundary(tl, firstBR), new Boundary(secondTL, br));
    }
  }
}
