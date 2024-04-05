
function quadGradientBuffer(bounds, colors) {
    let w = bounds.tr.x - bounds.tl.x;
    let h = bounds.br.y - bounds.tr.y;
    let buffer = createGraphics(w, h);
  
    buffer.background(colors[0]);
  
    let baseGradient = drawingContext.createLinearGradient(0, 0, w, h);
    baseGradient.addColorStop(0, colors[0]);
    baseGradient.addColorStop(0.5, colors[1]);
    baseGradient.addColorStop(1, colors[0]);
  
    let curveGradient = drawingContext.createLinearGradient(
      random(w),
      random(h),
      random(w),
      random(h)
    );
    curveGradient.addColorStop(0, colors[2]);
    curveGradient.addColorStop(1, colors[3]);
  
    buffer.drawingContext.fillStyle = baseGradient;
    buffer.drawingContext.strokeStyle = baseGradient;
    buffer.rect(0, 0, w, h);
  
    buffer.drawingContext.fillStyle = curveGradient;
  
    let cp1 = bounds.tr;
    let cp2 = bounds.bl;
    buffer.bezier(0, 0, cp1.x, cp1.y, cp2.x, cp2.y, w, h);
  
    for (let i = 0; i < 2; i++) {
      buffer.drawingContext.fillStyle = random(colors);
      buffer.ellipse(random(w), random(h), random(w / 2, w / 1.5));
    }
  
    buffer.filter(BLUR, 150);
    return buffer;
  }