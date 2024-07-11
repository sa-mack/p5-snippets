
class Boundary {
    constructor(tl, br) {
      this.tl = tl;
      this.br = br;
      this.tr = createVector(br.x, tl.y);
      this.bl = createVector(tl.x, br.y);
      this.w = br.x - tl.x;
      this.h = br.y - tl.y;
    }
  
    contains(pt) {
      return (pt.x >= this.tl.x && pt.x <= this.br.x && pt.y >= this.tl.y && pt.y <= this.br.y);
    }
    draw() {
      line(this.tl.x, this.tl.y, this.tr.x, this.tr.y);
      line(this.tr.x, this.tr.y, this.br.x, this.br.y);
      line(this.bl.x, this.bl.y, this.br.x, this.br.y);
      line(this.tl.x, this.tl.y, this.bl.x, this.bl.y);
    }
    shrink(val) {
      const TL = createVector(this.tl.x + val, this.tl.y + val)
      const BR = createVector(this.br.x - val, this.br.y - val);
      this.tl = TL;
      this.br = BR;
      this.bl = createVector(TL.x, BR.y)
      this.tr = createVector(BR.x, TL.y);
      this.w = BR.x - TL.x;
      this.h = BR.y - TL.y;
    }
    expand(val) {
      const TL = createVector(this.tl.x - val, this.tl.y - val)
      const BR = createVector(this.br.x + val, this.br.y + val);
      this.tl = TL;
      this.br = BR;
      this.bl = createVector(TL.x, BR.y)
      this.tr = createVector(BR.x, TL.y);
      this.w = BR.x - TL.x;
      this.h = BR.y - TL.y;
    }
  }