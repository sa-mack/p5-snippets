function setup() {
    createCanvas(800, 800);
    background(20);
    ellipseMode(RADIUS)
    stroke(255)
    strokeWeight(1.5);
    noFill()
  
      let r = 3;
    let k = 30;
    let w = r / sqrt(2);
    let region = { xStart: 100, yStart: 100, width: 600, height: 600 };
    let grid = new Grid(region, w);
  
    let active = [];
    let pts = [];
  
    placeInitialSample(grid, active, pts, region, w);
    generateSamples(active, grid, pts, r, k, w);
    for (let p of pts) {
  
      point(p.x, p.y)
    }
  }
  
  
  class Grid {
    constructor(region, cellSize) {
      this.region = region;
      this.cellSize = cellSize;
      this.cols = floor(region.width / cellSize);
      this.rows = floor(region.height / cellSize);
      this.cells = new Array(this.cols * this.rows).fill(undefined);
    }
  
    insert(sample) {
      let col = floor((sample.x - this.region.xStart) / this.cellSize);
      let row = floor((sample.y - this.region.yStart) / this.cellSize);
      this.cells[col + row * this.cols] = sample;
    }
    isValid(sample, r) {
      let col = floor((sample.x - this.region.xStart) / this.cellSize);
      let row = floor((sample.y - this.region.yStart) / this.cellSize);
      if (col < 0 || row < 0 || col >= this.cols || row >= this.rows) return false;
  
      let startCol = max(0, col - 2);
      let endCol = min(col + 2, this.cols - 1);
      let startRow = max(0, row - 2);
      let endRow = min(row + 2, this.rows - 1);
  
      for (let i = startCol; i <= endCol; i++) {
        for (let j = startRow; j <= endRow; j++) {
          let neighbor = this.cells[i + j * this.cols];
          if (neighbor) {
            let d = p5.Vector.dist(sample, neighbor);
            if (d < r) return false;
          }
        }
      }
      return true;
    }
  }
  
  
  function generateSamples(active, grid, pts, r, k, w) {
    while (active.length > 0) {
      let idx = floor(random(active.length));
      let pos = active[idx];
      let found = false;
  
      let nr = floor(map(getNoiseForPos(pos, 0.005), 0, 1, 2, 8))
      
      for (let n = 0; n < k; n++) {
        let sample = p5.Vector.random2D();
        sample.setMag(random(nr, 2 * nr));
        sample.add(pos);
        sample.n = nr;
  
        if (grid.isValid(sample, nr)) {
          found = true;
          grid.insert(sample);
          active.push(sample);
          pts.push(sample);
          break;
        }
      }
  
      if (!found) {
        active.splice(idx, 1);
      }
    }
  }
  
  function validateSample(sample, grid, r) {
    return grid.isValid(sample, r);
  }
  
  function placeInitialSample(grid, active, pts, region, cellSize) {
    let x0 = createVector(random(region.xStart, region.xStart + region.width), random(region.yStart, region.yStart + region.height));
    grid.insert(x0);
    active.push(x0);
    pts.push(x0);
  }
  
  
  
   function getNoiseForPos(pos, sf) {
      let n = noise(pos.x * sf, pos.y * sf)
      
      return n;
    }