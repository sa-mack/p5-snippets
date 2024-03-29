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
      tl: { x: ceil(minX), y: ceil(minY) },
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