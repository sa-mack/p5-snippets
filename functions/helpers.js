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
