function setup() {
    const dimensionless = min(windowWidth, windowHeight);
    createCanvas(dimensionless, dimensionless);
    ellipseMode(RADIUS);
    rectMode(CORNERS);
    angleMode(DEGREES);
    background(0);
    stroke(255);
    strokeWeight(2)
  
    let density = 50;
    let margin = width * 0.05;
    let xSpace = (width - (margin * 2)) / density;
    let ySpace = (height - (margin * 2)) / density;
  
    let rowIdx = 0;
    for (let y = margin; y < height - margin; y += ySpace) {
      
      let colIdx = 0;
  
      for (let x = margin; x < width - margin; x += xSpace) {
        point(x + (xSpace / 2), y + (ySpace / 2))
        console.log(rowIdx, colIdx)
        
        colIdx++;
      }
      rowIdx++;
    }
  }
  