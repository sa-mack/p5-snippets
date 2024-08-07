class Grid {
  constructor(margin, density) {
    this.margin = margin;
    this.density = density;
    this.xSpace = (width - margin * 2) / density;
    this.ySpace = (height - margin * 2) / density;
    this.init();
  }
  init() {
    let rowIdx = 0;
    this.rows = [];
    for (let y = this.margin; y < height - this.margin; y += this.ySpace) {
      let colIdx = 0;
      let rw = [];

      for (let x = this.margin; x < width - this.margin; x += this.xSpace) {
        rw.push({
          tl: createVector(x, y),
          br: createVector(x + this.xSpace, y + this.ySpace),
        });
        colIdx++;
      }
      this.rows.push(rw);
      rowIdx++;
    }
  }
  lookup(rowIdx, colIdx) {
    return this.rows[rowIdx][colIdx];
  }
  debug() {
    push();
    noFill();
    stroke("#ffffff")
    for (let i = 0; i < this.rows.length; i++) {
        for (let j = 0; j < this.rows[i].length; j++) {
          let cell = this.rows[i][j]
            rect(cell.tl.x, cell.tl.y, cell.br.x, cell.br.y);
          console.log(cell)
            text(`${i}, ${j}`, cell.tl.x, cell.br.y);
        }
    }
      pop();
  }
}
