
class PoissonGrid {
    constructor(region, r, k = 30) {
      this.region = region;
      this.cellSize = r / sqrt(2);
      this.r = r;
      this.k = k;
      this.cols = floor(region.gridW / this.cellSize);
      this.rows = floor(region.gridH / this.cellSize);
      this.cells = new Array(this.cols * this.rows).fill(undefined);
      this.active = [];
      this.pts = []
    }
  
    insert(sample) {
      let col = floor((sample.x - this.region.xStart) / this.cellSize);
      let row = floor((sample.y - this.region.yStart) / this.cellSize);
      this.cells[col + row * this.cols] = sample;
    }
    isValid(sample) {
      let col = floor((sample.x - this.region.xStart) / this.cellSize);
      let row = floor((sample.y - this.region.yStart) / this.cellSize);
      if (col < 0 || row < 0 || col >= this.cols || row >= this.rows)
        return false;
  
      let startCol = max(0, col - 2);
      let endCol = min(col + 2, this.cols - 1);
      let startRow = max(0, row - 2);
      let endRow = min(row + 2, this.rows - 1);
  
      for (let i = startCol; i <= endCol; i++) {
        for (let j = startRow; j <= endRow; j++) {
          let neighbor = this.cells[i + j * this.cols];
          if (neighbor) {
            let d = p5.Vector.dist(sample, neighbor);
            if (d < this.r) return false;
          }
        }
      }
      return true;
    }
    generateSamples() {
        let x0 = createVector(
            random(this.region.xStart, this.region.xStart + this.region.gridW),
            random(this.region.yStart, this.region.yStart + this.region.gridH)
          );
          this.insert(x0);
          this.active.push(x0);
          this.pts.push(x0);

      while (this.active.length > 0) {
        let idx = floor(random(this.active.length));
        let pos = this.active[idx];
        let found = false;
    
    
        for (let n = 0; n < this.k; n++) {
          let sample = p5.Vector.random2D();
          sample.setMag(random(this.r, 2 * this.r));
          sample.add(pos);
    
          if (this.isValid(sample, this.r)) {
            found = true;
            this.insert(sample);
            this.active.push(sample);
            this.pts.push(sample);
            break;
          }
        }
    
        if (!found) {
          this.active.splice(idx, 1);
        }
      }
      return this.pts;
    }
    drawPoints(strokeW = 2) {
        strokeWeight(strokeW)
         for (let i = 1; i < this.pts.length; i++) {
        point(this.pts[i].x, this.pts[i].y)
      }
      }

  }

