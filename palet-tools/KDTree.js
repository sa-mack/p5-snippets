
class KDTree {
  constructor(tl, br, capacity = 1) {
    this.bounds = new Boundary(tl, br);
    this.capacity = capacity;
    this.pts = [];
    this.divided = false;
    this.left = null;
    this.right = null;
  }

  insert(pt, depth = 0) {
    if (!this.bounds.contains(pt)) {
      return false;
    }
    if (this.pts.length < this.capacity) {
      this.pts.push(pt);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide(depth);
      }
      if (this.left.insert(pt, depth + 1) || this.right.insert(pt, depth + 1)) {
        return true;
      }
    }
    return false;
  }

  subdivide(depth) {
    let axis = depth % 2; // 0 x-axis, 1 y-axis
    let pts = this.pts.slice();
    pts.sort((a, b) => axis === 0 ? a.x - b.x : a.y - b.y);
    let medianIndex = floor(pts.length / 2);
    let medianPoint = pts[medianIndex];

    if (axis === 0) {
      this.left = new KDTree(this.bounds.tl, createVector(medianPoint.x, this.bounds.br.y), this.capacity);
      this.right = new KDTree(createVector(medianPoint.x, this.bounds.tl.y), this.bounds.br, this.capacity);
    } else {
      this.left = new KDTree(this.bounds.tl, createVector(this.bounds.br.x, medianPoint.y), this.capacity);
      this.right = new KDTree(createVector(this.bounds.tl.x, medianPoint.y), this.bounds.br, this.capacity);
    }

    this.divided = true;
    for (let i = 0; i < pts.length; i++) {
      if (i !== medianIndex) {
        this.left.insert(pts[i], depth + 1);
        this.right.insert(pts[i], depth + 1);
      }
    }
  }
 getCells(depth = 0) {
    let arr = [];
    if (!this.divided) {
      arr.push(this.bounds);
    } else if (this.divided) {
      arr = arr.concat(this.left.getCells(depth + 1));
      arr = arr.concat(this.right.getCells(depth + 1));
    }
    return arr;
  }
  
   getPts(depth = 0) {
    let arr = [];
    if (!this.divided) {
      if (this.pts.length > 0) {
              arr.push(this.pts[0])
      }
    } else if (this.divided) {
      arr = arr.concat(this.left.getPts(depth + 1));
      arr = arr.concat(this.right.getPts(depth + 1));
    }
    return arr;
  }
  
    getOccupiedCells(depth = 0) {
    let arr = [];
    if (!this.divided) {
      if (this.pts.length > 0) {
              arr.push(this.bounds)
      }
    } else if (this.divided) {
      arr = arr.concat(this.left.getOccupiedCells(depth + 1));
      arr = arr.concat(this.right.getOccupiedCells(depth + 1));
    }
    return arr;
  }
}



