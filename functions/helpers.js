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


function inRect(pt, tl, br) {
  return pt.x < br.x && pt.x > tl.x && pt.y < br.y && pt.y > tl.y;
}


function shrinkBounds(bounds, m) {
  if (bounds.tl.x + m > bounds.tr.x - m) {
    console.log("too small")
    return bounds;
  } else {
  return {
    tl: createVector(bounds.tl.x + m, bounds.tl.y + m),
    tr: createVector(bounds.tr.x - m, bounds.tr.y + m),
    br: createVector(bounds.br.x - m, bounds.br.y - m),
    bl: createVector(bounds.bl.x + m, bounds.bl.y - m)
  }
  }
}
