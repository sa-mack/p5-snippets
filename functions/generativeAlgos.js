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