function setup() {
  const minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim);
  background(0);
  stroke(255);
  strokeWeight(2)

  let density = 50;
  let margin = width * 0.1;
  let xSpace = (width - (margin * 2)) / density;
  let ySpace = (height - (margin * 2)) / density;

  for (let x = margin; x < width - margin; x += xSpace) {
    for (let y = margin; y < height - margin; y += ySpace) {
        point(x,y)
    }
  }
}
