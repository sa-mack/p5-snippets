function getBoundingBox(vertices) {
    if (!vertices || vertices.length === 0) {
      return null;
    }
    let minX = vertices[0].x;
    let maxX = vertices[0].x;
    let minY = vertices[0].y;
    let maxY = vertices[0].y;
  
    for (let vtx of vertices) {
      if (vtx.x < minX) {
        minX = vtx.x;
      }
      if (vtx.x > maxX) {
        maxX = vtx.x;
      }
      if (vtx.y < minY) {
        minY = vtx.y;
      }
      if (vtx.y > maxY) {
        maxY = vtx.y;
      }
    }
  
    return {
      tl: { x: floor(minX), y: floor(minY) },
      br: { x: ceil(maxX), y: ceil(maxY) },
    };
  }
  
  
  
  function randomMultiRangeInt(...ranges) {
    //pass arrays but not inside another array
    const range = random(ranges);
    const num = floor(random(range[0], range[1]));
    return num;
  }
  
  function randomMultiRangeFloat(...ranges) {
    //pass arrays but not inside another array
    const range = random(ranges);
    const num = random(range[0], range[1]);
    return num;
  } 


function shuffleInPlace(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function simplifyVectors(vectors, n) {
  if (n >= vectors.length || n <= 0) {
    console.log("n >= len or n <= 0");
    return vectors;
  }

  while (vectors.length > n) {
    let shortestDistance = Infinity;
    let rmIdx = -1;
    for (let i = 0; i < vectors.length - 1; i++) {
      let distance = vectors[i].dist(vectors[i + 1]);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        rmIdx = i;
      }
    }

    if (rmIdx !== -1) {
      let lerped = p5.Vector.lerp(vectors[rmIdx], vectors[rmIdx + 1], 0.5);
    
      vectors.splice(rmIdx, 2);
      vectors.splice(rmIdx, 0, lerped);
    }
  }

  return vectors;
}