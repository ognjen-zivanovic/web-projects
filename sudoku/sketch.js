let board = [];
let collapsed = [];

const size = 80;

const offsetX = 50;
const offsetY = 50;

let canvasOffset;

let start = [];
let inputTextBox;

function resetStart() {
	for (let i = 1; i <= 9; i++) {
		start[i] = [];
		for (let j = 1; j <= 9; j++) {
			start[i][j] = -1;
		}
	}
}

function resetBoard() {
	for (let i = 1; i <= 9; i++) {
		board[i] = [];
		for (let j = 1; j <= 9; j++) {
			board[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		}
	}
}

function resetCollapsed() {
	for (let i = 1; i <= 9; i++) {
		collapsed[i] = [];
		for (let j = 1; j <= 9; j++) {
			collapsed[i][j] = false;
		}
	}
}

function preload() {
	resetStart();
}

function reset() {
	resetBoard();
	resetCollapsed();

	// start[1][1] = 8;
	// start[2][3] = 7;
	// start[2][4] = 5;
	// start[2][9] = 9;
	// start[3][2] = 3;
	// start[3][7] = 1;
	// start[3][8] = 8;

	// start[4][2] = 6;
	// start[4][6] = 1;
	// start[4][8] = 5;
	// start[5][3] = 9;
	// start[5][5] = 4;
	// start[6][4] = 7;
	// start[6][5] = 5;

	// start[7][3] = 2;
	// start[7][5] = 7;
	// start[7][9] = 4;
	// start[8][6] = 3;
	// start[8][7] = 6;
	// start[8][8] = 1;
	// start[9][7] = 8;

	for (let i = 1; i <= 9; i++) {
		for (let j = 1; j <= 9; j++) {
			if (start[i][j] > -1) {
				collapse(i, j, start[i][j], true);
			}
		}
	}
}

let board_width = 3 * 3 * size;
let board_heigth = 3 * 3 * size;

let selected_i = -1;
let selected_j = -1;

function startSolving() {
	reset();
	done = false;
	impossible = false;
}

function setup() {
	canvas = createCanvas(board_width + 100, board_heigth + 100);
	canvas.parent("centered-canvas");
	canvasOffset = canvas.elt.getBoundingClientRect();

	inputTextBox = createInput();
	inputTextBox.position(-100, -100);
	inputTextBox.size(0);
	inputTextBox.input(function (value) {
		charValue = value.data;
		inputTextBox.value("");
		if (selected_i == -1 || selected_i == -1) return;
		if (charValue >= "0" && charValue <= "9") {
			start[selected_i][selected_j] = charValue - "0";
			board[selected_i][selected_j] = [charValue - "0"];
		}
	});
	inputTextBox.style("z-index", "10");
	inputTextBox.style("position", "absolute");

	// add buttons for clear and solve, they should be horizontal and be the same width and take up the whole width
	let buttonsContainer = createDiv();
	buttonsContainer.parent("centered-canvas");
	buttonsContainer.style("display", "flex");
	buttonsContainer.style("flex-direction", "row");
	buttonsContainer.style("gap", "20px");

	let clearButton = createButton("Clear");
	clearButton.size(board_width / 2 - 10, 50);
	clearButton.class("button-style");
	clearButton.mousePressed(() => {
		resetStart();
		resetBoard();
		resetCollapsed();
		selected_i = selected_j = -1;
	});

	let solveButton = createButton("Solve");
	solveButton.size(board_width / 2 - 10, 50);
	solveButton.class("button-style");
	solveButton.mousePressed(() => {
		startSolving();
	});

	buttonsContainer.child(clearButton);
	buttonsContainer.child(solveButton);

	reset();
}

let done = true;
let impossible = false;

function collapse(ci, cj, val, starting = false) {
	board[ci][cj] = [val];

	for (let i = 1; i <= 9; i++) {
		if (i == ci) continue;

		const index = board[i][cj].indexOf(val);
		if (index > -1) {
			// only splice array when item is found
			board[i][cj].splice(index, 1); // 2nd parameter means remove one item only
			if (board[i][cj].length <= 0) {
				if (starting) {
					impossible = true;
					return;
				}
			}
		}
	}

	for (let j = 1; j <= 9; j++) {
		if (j == cj) continue;

		const index = board[ci][j].indexOf(val);
		if (index > -1) {
			// only splice array when item is found
			board[ci][j].splice(index, 1); // 2nd parameter means remove one item only
			if (board[ci][j].length <= 0) {
				if (starting) {
					impossible = true;
					return;
				}
			}
		}
	}

	let ki = floor((ci - 1) / 3);
	let kj = floor((cj - 1) / 3);

	for (let i = ki * 3 + 1; i <= ki * 3 + 3; i++) {
		for (let j = kj * 3 + 1; j <= kj * 3 + 3; j++) {
			if (ci == i && cj == j) continue;
			const index = board[i][j].indexOf(val);
			if (index > -1) {
				// only splice array when item is found
				board[i][j].splice(index, 1); // 2nd parameter means remove one item only
				if (board[i][j].length <= 0) {
					if (starting) {
						impossible = true;
						return;
					}
				}
			}
		}
	}

	collapsed[ci][cj] = true;
}

function update() {
	let min_entropy = Infinity;
	let cellsWithLeastEntropy = [];

	for (let i = 1; i <= 9; i++) {
		for (let j = 1; j <= 9; j++) {
			if (board[i][j].length <= 0) {
				reset();
				return;
			}
			if (collapsed[i][j]) continue;
			if (board[i][j].length < min_entropy) {
				min_entropy = board[i][j].length;
			}
			if (board[i][j].length == min_entropy) {
				cellsWithLeastEntropy.push([i, j]);
			}
		}
	}

	if (cellsWithLeastEntropy.length > 0) {
		let r = floor(random(cellsWithLeastEntropy.length));
		let ci = cellsWithLeastEntropy[r][0];
		let cj = cellsWithLeastEntropy[r][1];

		let val = board[ci][cj][floor(random(board[ci][cj].length))];

		collapse(ci, cj, val);
	} else {
		done = true;
	}
}

function draw() {
	while (!done && !impossible) {
		update();
	}
	background(220);

	translate(offsetX, offsetY);
	push();

	noStroke();
	fill(255, 255, 255);
	rect(0, 0, board_width, board_heigth);
	pop();

	for (let i = 0; i <= 9; i++) {
		if (i % 3 == 0) strokeWeight(2);
		else strokeWeight(1);
		line(0, i * size, board_width, i * size);
		line(i * size, 0, i * size, board_heigth);
	}

	textSize(50);
	textAlign(CENTER, CENTER);
	for (let i = 1; i <= 9; i++) {
		for (let j = 1; j <= 9; j++) {
			if (start[i][j] != -1) {
				push();
				fill(255, 0, 0);
			}
			if (board[i][j].length == 1) {
				text(board[i][j], (i - 1) * size, (j - 1) * size, size, size);
			} else if (start[i][j] != -1) {
				text(start[i][j], (i - 1) * size, (j - 1) * size, size, size);
			}
			if (start[i][j] != -1) {
				pop();
			}
		}
	}

	if (selected_i > -1 && selected_j > -1) {
		push();
		noFill();
		stroke(0, 255, 0);
		rect((selected_i - 1) * size, (selected_j - 1) * size, size, size);
		pop();
	}
}

function handlePress(x, y) {
	if (!x || !y) return;
	selected_i = floor((x - offsetX) / size) + 1;
	selected_j = floor((y - offsetY) / size) + 1;

	if (selected_i <= 0 || selected_i > 9 || selected_j <= 0 || selected_j > 9) {
		selected_i = selected_j = -1;
		return;
	}
	setTimeout(() => {
		inputTextBox.elt.focus();
	}, 0);
}

function mousePressed() {
	handlePress(mouseX, mouseY);
}

function touchEnded(event) {
	if (!event.changedTouches) return;
	let x = event.changedTouches[0]?.clientX - canvasOffset.left;
	let y = event.changedTouches[0]?.clientY - canvasOffset.top;
	handlePress(x, y);
}
