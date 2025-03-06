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


function getBoundingBox(pts) {
  if (!pts || pts.length === 0) {
 return null;
  }
  let minX = pts[0].x;
  let maxX = pts[0].x;
  let minY = pts[0].y;
  let maxY = pts[0].y;
  for (let pt of pts) {
    if (pt.x < minX) {
      minX = pt.x;
    }
    if (pt.x > maxX) {
      maxX = pt.x;
    }
    if (pt.y < minY) {
      minY = pt.y;
    }
    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }
  return {
    tl: { x: floor(minX), y: floor(minY) },
    br: { x: ceil(maxX), y: ceil(maxY) },
  };
}

function simplifyVectors(pts, n) {
  if (n >= pts.length || n <= 0) {
    console.log("n >= len or n <= 0");
    return pts;
  }
  while (pts.length > n) {
    let shortestDistance = Infinity;
    let rmIdx = -1;
    for (let i = 0; i < pts.length - 1; i++) {
      let distance = pts[i].dist(pts[i + 1]);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        rmIdx = i;
      }
    }
    if (rmIdx !== -1) {
      let lerped = p5.Vector.lerp(pts[rmIdx], pts[rmIdx + 1], 0.5);
      pts.splice(rmIdx, 2);
      pts.splice(rmIdx, 0, lerped);
    }
  }
  return pts;
}

function sortByDistance(pts, target) {
  let sorted = pts.slice();
  sorted.sort((a, b) => {
    let distA = dist(a.x, a.y, target.x, target.y);
    let distB = dist(b.x, b.y, target.x, target.y);
    return distA - distB;
  });
  return sorted;
}


function getPolyArea(pts) {
  const n = pts.length;
  if (n < 3) {
    throw new Error("arr len");
  }

  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < n; i++) {
    const v1 = pts[i];
    const v2 = pts[(i + 1) % n];
    sum1 += v1.x * v2.y;
    sum2 += v1.y * v2.x;
  }
  
  return 0.5 * Math.abs(sum1 - sum2);

}

function findAngle(pt1, pt2) {
  let dx = pt2.x - pt1.x;
  let dy = pt2.y - pt1.y;
  let angle = atan2(dy, dx);
  return angle;
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
