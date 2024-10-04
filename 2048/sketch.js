let width = 400;
let height = 400;

let tile_size = 100;

let board = [];

let scores = new Map();

function setup() {
  createCanvas(width, height);

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  scores.set(2, 2);
  let i = 4;
  while (i <= 32768) {
    scores.set(i, 2 * scores.get(i / 2) + i);
    i *= 2;
  }

  //console.log(scores);
}

function move(b, dx, dy) {
  let merged = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  let starti = 0;
  let endi = 4;
  let startj = 0;
  let endj = 4;

  let di = 1;
  let dj = 1;

  if (dx > 0) {
    [startj, endj] = [endj - 1, startj - 1];
    dj = -1;
  }
  if (dy > 0) {
    [starti, endi] = [endi - 1, starti - 1];
    di = -1;
  }

  for (let i = starti; i < endi || i > endi; i += di) {
    for (let j = startj; j < endj || j > endj; j += dj) {
      if (b[i][j] == 0) continue;
      let y = i;
      let x = j;
      let nx = -1;
      let ny = -1;
      for (let s = 0; s < 4; s++) {
        x += dx;
        y += dy;
        if (x < 0 || x >= 4 || y < 0 || y >= 4) continue;
        if (b[y][x] != 0 && b[y][x] != b[i][j]) continue;
        if (merged[y][x] == 1) continue;
        nx = x;
        ny = y;
      }
      if (nx != -1 && ny != -1) {
        if (b[ny][nx] != 0) merged[ny][nx] = 1;
        b[ny][nx] += b[i][j];
        b[i][j] = 0;
      }
    }
  }
}

/*
function keyPressed() { //original (user plays)
  var change = false;
  if (key == "ArrowLeft") {
    move(board, -1, 0);
    change = true;
  }
  if (key == "ArrowRight") {
    move(board, 1, 0);
    change = true;
  }
  if (key == "ArrowUp") {
    move(board, 0, -1);
    change = true;
  }
  if (key == "ArrowDown") {
    move(board, 0, 1);
    change = true;
  }

  
  if (change) {
    let ry = floor(random() * 4);
    let rx = floor(random() * 4);
    while (board[ry][rx] != 0) {
      ry = floor(random() * 4);
      rx = floor(random() * 4);
    }
    board[ry][rx] = 2;
  }
}
*/

function grade(b) {
  let score = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (b[i][j] > 0) score += scores.get(b[i][j]);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (b[i][j] == 0) continue;
      if (b[i][j] == b[i][j + 1]) {
        score += 0;//b[i][j]/10;
      }
    }
  }

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      if (b[i][j] == 0) continue;
      if (b[i][j] == b[i + 1][j]) {
        score += b[i][j];
      }
    }
  }
  
  let m = b[0][0];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (b[i][j] > m) {
        return score * 0.8;
      }
    }
  }
  

  return score;
}

function update() {
  var change = true;

  let cnt = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] > 0) cnt++;
    }
  }
  if (cnt == 16) change = false;
  
  let boardLeft = board.map((arr) => arr.slice());
  let boardRight = board.map((arr) => arr.slice());
  let boardUp = board.map((arr) => arr.slice());
  let boardDown = board.map((arr) => arr.slice());

  move(boardLeft, -1, 0);
  move(boardRight, 1, 0);
  move(boardUp, 0, -1);
  move(boardDown, 0, 1);

  let s1 = grade(boardUp);
  let s2 = grade(boardLeft);
  let s3 = grade(boardRight);
  let s4 = grade(boardDown);
  
  let s = 0;
  let i = 0;
  if (s1 > s) {
    i = 1;
    s = s1;
  }
  if (s2 > s) {
    i = 2;
    s = s2;
  }
  if (s3 > s) {
    i = 3;
    s = s3;
  }
  if (s4 > s) {
    i = 4;
    s = s4;
  }

  if (i == 1) board = boardUp;
  if (i == 2) board = boardLeft;
  if (i == 3) board = boardRight;
  if (i == 4) board = boardDown;


  if (change) {
    let ry = floor(random() * 4);
    let rx = floor(random() * 4);
    while (board[ry][rx] != 0) {
      ry = floor(random() * 4);
      rx = floor(random() * 4);
    }
    board[ry][rx] = 2;
    if (random() > 0.9) board[ry][rx] = 4;
  }
}
let timer = 0;
function draw() {
  background(220);

  if (keyIsDown(LEFT_ARROW)) {
    for (let i = 0; i < 20; i++)
      update();
  }

  //if (millis() >= 50 + timer) {
    //timer = millis();
  //}

  let margin = tile_size / 10;

  textAlign(CENTER, CENTER);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i][j] == 2) fill("#EEE4DA");
        if (board[i][j] == 4) fill("#EDE0C8");
        if (board[i][j] == 8) fill("#F2B179");
        if (board[i][j] == 16) fill("#F59563");
        if (board[i][j] == 32) fill("#F67C5F");
        if (board[i][j] == 64) fill("#F65E3B");
        if (board[i][j] == 128) fill("#EDCF72");
        if (board[i][j] == 256) fill("#EDCC61");
        if (board[i][j] == 512) fill("#EDC850");
        if (board[i][j] == 1024) fill("#EDC53F");
        if (board[i][j] == 2048) fill("#EDC22E");
        if (board[i][j] >= 4096) fill("#3E3933");

        if (board[i][j] < 1024) textSize(40);
        else textSize(25);
        
        rect(
          j * tile_size + margin,
          i * tile_size + margin,
          tile_size - 2 * margin,
          tile_size - 2 * margin,
          margin / 2
        );

        fill(0, 0, 0);
        text(
          board[i][j],
          j * tile_size + tile_size / 2,
          (i + 1) * tile_size - tile_size / 2
        );
      }
    }
  }
}
