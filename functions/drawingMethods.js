function sketchyLine(a1, a2) {
    push();
    let sf = 0.005;
    let d = floor(dist(a1.x, a1.y, a2.x, a2.y));
    for (let i = 0; i < d; i++) {
      let t = i / d;
      let dot = p5.Vector.lerp(a1, a2, t);
  
      let jitter = map(noise(dot.x * sf, dot.y * sf), 0, 1, -1, 1);
      strokeWeight(random(1, 1.5));
      point(dot.x + jitter, dot.y + jitter);
      let chance = floor(random(75));
      if (chance == 0) {
        i += floor(random(d / 40, d / 20));
      }
    }
    pop();
  }

function sketchyEllipse(pos, radX, radY = radX, startA = 0, stopA = 360) {
    let circ = PI * (max(radX, radY) * 2);
    let aStep = max(360 / circ, 0.05);
    for (let a = startA; a < stopA; a += aStep) {
      let x = pos.x + cos(a) * radX;
      let y = pos.y + sin(a) * radY;
      strokeWeight(random(0.9, 1.1));
      point(x, y);
      let chance = floor(random(100));
      if (chance == 0) {
        a += floor(random(5 * aStep, 10 * aStep));
      }
    }
  }
  

function sketchyRect(bounds) {
    sketchyLine(bounds.tl, bounds.tr);
    sketchyLine(bounds.tr, bounds.br);
    sketchyLine(bounds.br, bounds.bl);
    sketchyLine(bounds.bl, bounds.tl);
  }
  