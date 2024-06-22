function chaikin(vertices, numPasses) {
    while (numPasses > 0) {
      let chaikined = [];
      for (let i = 0; i < vertices.length; i++) {
        let startPt = vertices[i];
        let endPt = vertices[(i + 1) % vertices.length];
        let firstPt = p5.Vector.lerp(startPt, endPt, 0.25);
        let secondPt = p5.Vector.lerp(startPt, endPt, 0.75);
        chaikined.push(firstPt, secondPt);
      }
      vertices = chaikined;
      numPasses--;
    }
    return vertices;
  }


  function chaikinOpen(vertices, numPasses) {
    while (numPasses > 0) {
      let chaikined = [];
      for (let i = 1; i < vertices.length; i++) {
        let startPt = vertices[i - 1];
        let endPt = vertices[i];
        let firstPt = p5.Vector.lerp(startPt, endPt, 0.25);
        let secondPt = p5.Vector.lerp(startPt, endPt, 0.75);
        chaikined.push(firstPt, secondPt);
      }
      vertices = chaikined;
      numPasses--;
    }
    return vertices;
  }

  function recursiveGrid(tl, br, depth, rects = []) {
    if (depth <= 0) {
      return;
    }
    let w = br.x - tl.x;
    let h = br.y - tl.y;
  
    let direction; //0 vert, 1 horiz
    if (w > h) {
      direction = 0;
    } else if (h > w) {
      direction = 1;
    } else {
      direction = floor(random(2));
    }
    let firstTL;
    let firstBR;
    let secondTL;
    let secondBR;
  
    if (direction == 0) {
      let nextW = floor(random(w * 0.35, w * 0.65));
      firstTL = tl;
      firstBR = createVector(floor(tl.x + nextW), br.y);
      secondTL = createVector(floor(tl.x + nextW), tl.y);
      secondBR = br;
    } else {
      let nextH = floor(random(h * 0.35, h * 0.65));
      firstTL = tl;
      firstBR = createVector(br.x, floor(tl.y + nextH));
      secondTL = createVector(tl.x, floor(tl.y + nextH));
      secondBR = br;
    }
  
    let skipChance = floor(random(5));
  
    if (depth > 2 && skipChance == 0) {
      depth -= random([1, 2]);
    }
  
    recursiveGrid(firstTL, firstBR, depth - 1, rects);
    recursiveGrid(secondTL, secondBR, depth - 1, rects);
  
    if (depth == 1) {
      rects.push({tl: firstTL, 
                  tr: createVector(firstBR.x, firstTL.y),
                  br: firstBR,
                  bl: createVector(firstTL.x, firstBR.y)},
                 
                 {tl: secondTL,
                  tr: createVector(secondBR.x, secondTL.y),
                  br: secondBR,
                 bl: createVector(secondTL.x, secondBR.y)});
    }
    return rects;
  }

  function convexHull(points) {
    if (points.length < 3) return points;

    let start = points[0];
    for (let p of points) {
      if (p.y < start.y || (p.y === start.y && p.x < start.x)) {
        start = p;
      }
    }
    function angle(a, b) {
      return atan2(b.y - a.y, b.x - a.x);
    }
    points.sort((a, b) => angle(start, a) - angle(start, b));
    let hull = [points[0], points[1]];
    for (let i = 2; i < points.length; i++) {
      let last = hull.pop();
      while (hull.length && cross(hull[hull.length - 1], last, points[i]) <= 0) {
        last = hull.pop();
      }
      hull.push(last, points[i]);
    }
    return hull;
  }
  
  function cross(o, a, b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  }
  
  function lerpShapes(shapeA, shapeB, t) {
    if (shapeA.length !== shapeB.length) {
      console.error("lerpShapes arrays must be the same length");
      return;
    }
    let lerped = [];
    for (let i = 0; i < shapeA.length; i++) {
      let x = lerp(shapeA[i].x, shapeB[i].x, t);
      let y = lerp(shapeA[i].y, shapeB[i].y, t);
      lerped.push(createVector(x, y));
    }
    return lerped;
  }
  
  function getPoles(pts) {
    let north =  pts[0];
    let south =  pts[0];
    let east =  pts[0];
    let west =  pts[0];

    for (let i = 0; i < pts.length; i++) {
      if (pts[i].y <= north.y) {
        north = pts[i];
      }
       if (pts[i].y >= south.y) {
        south = pts[i];
      }
      if (pts[i].x <= west.x) {
        west = pts[i];
      }
      if (pts[i].x >= east.x) {
        east = pts[i];
      }
    }
    return {
      north, south, east, west
    }
  }