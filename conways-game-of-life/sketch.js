let arr = [];
let arr2 = [];
let w = 20;
let h = 20;
let size = 5;

function setup() {
  createCanvas(w * size, h * size);

  for (let i = 0; i < h; i++) {
    arr[i] = [];
    arr2[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = random() > 0.5;
      arr2[i][j] = 0;
    }
  }
}
function draw() {
  update();

  background(220);
  noStroke();
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (arr[i][j] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(i * size, j * size, size, size);
    }
  }
}

function update() {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let cnt = 0;
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          if (l == 0 && k == 0) continue;
          let p = i + k;
          let q = j + l;
          p = (p + h) % h;
          q = (q + w) % w;
          if (arr[p][q] == 1) cnt++;
        }
      }
      arr2[i][j] = arr[i][j];
      if (arr[i][j] == 1) {
        if (cnt < 2 || cnt > 3) arr2[i][j] = 0;
      } else {
        if (cnt == 3) arr2[i][j] = 1;
      }
    }
  }
  [arr, arr2] = [arr2, arr];
}
