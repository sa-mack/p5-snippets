
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
  }