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