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