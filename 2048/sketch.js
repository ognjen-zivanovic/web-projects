let tile_size = 100;

let width = 4 * tile_size;
let height = 4 * tile_size;

let board = [];
let SPEED = 1;

let scores = new Map();

function setup() {
	let canvas = createCanvas(width, height);
	canvas.parent("centered-canvas");

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
	addNewTile();
	//console.log(scores);

	instructionsText = createP(
		"Use arrow keys or swipe to play. Press space or hold to let the computer make the moves."
	);
	instructionsText.class("label");
	instructionsText.size((7 / 8) * width);
	instructionsText.style("text-align", "center");
	instructionsText.style("color", "#776E65");
	instructionsText.style("margin", "2rem");
	instructionsText.parent("centered-canvas");
}

function checkIfBoardFull() {
	let cnt = 0;
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (board[i][j] > 0) cnt++;
		}
	}
	if (cnt == 16) boardFull = true;
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

function keyPressed() {
	boardFull = false;
	//original (user plays)
	if (key == "ArrowLeft") {
		move(board, -1, 0);
	} else if (key == "ArrowRight") {
		move(board, 1, 0);
	} else if (key == "ArrowUp") {
		move(board, 0, -1);
	} else if (key == "ArrowDown") {
		move(board, 0, 1);
	} else {
		return;
	}
	checkIfBoardFull();

	if (!boardFull) {
		addNewTile();
	}
}

let hasMoved = false;
let startTouchX = 0;
let startTouchY = 0;

function touchStarted() {
	hasMoved = false;
	if (touches == undefined || touches.length == 0) return;
	startTouchX = touches[0].x;
	startTouchY = touches[0].y;
}
function touchMoved() {
	if (touches == undefined || touches.length == 0) return;
	if (hasMoved) return;
	let dx = touches[0].x - startTouchX;
	let dy = touches[0].y - startTouchY;
	let absx = abs(dx);
	let absy = abs(dy);
	if (absx > 5 * absy) {
		if (dx > 0) {
			move(board, 1, 0);
		} else {
			move(board, -1, 0);
		}
	} else if (absy > 5 * absx) {
		if (dy > 0) {
			move(board, 0, 1);
		} else {
			move(board, 0, -1);
		}
	} else {
		return;
	}

	hasMoved = true;
	checkIfBoardFull();

	if (!boardFull && hasMoved) {
		addNewTile();
	}
}

function touchEnded() {
	hasMoved = false;
}

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
				score += 0; //b[i][j]/10;
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

function addNewTile() {
	let ry = floor(random() * 4);
	let rx = floor(random() * 4);
	while (board[ry][rx] != 0) {
		ry = floor(random() * 4);
		rx = floor(random() * 4);
	}
	board[ry][rx] = 2;
	if (random() > 0.9) board[ry][rx] = 4;
}

var boardFull = false;

function solve() {
	boardFull = false;
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

	checkIfBoardFull();

	if (!boardFull) {
		addNewTile();
	}
}

function draw() {
	background(205, 193, 180);

	if (keyIsDown(32)) {
		// space
		for (let i = 0; i < SPEED; i++) solve();
	}

	let margin = tile_size / 10;

	fill(187, 173, 160);
	rect(0, 0, 4 * tile_size, 4 * tile_size, margin);

	textAlign(CENTER, CENTER);
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				noStroke();
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
					margin
				);

				if (board[i][j] <= 4) fill(119, 110, 101);
				else fill(249, 246, 242);
				textStyle(BOLD);
				text(
					board[i][j],
					j * tile_size + tile_size / 2,
					(i + 1) * tile_size - tile_size / 2 + margin / 2
				);
			} else {
				fill(205, 193, 180);
				rect(
					j * tile_size + margin,
					i * tile_size + margin,
					tile_size - 2 * margin,
					tile_size - 2 * margin,
					margin
				);
			}
		}
	}
}
