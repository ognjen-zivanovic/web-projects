let board = [];
let collapsed = [];
let board_size = 3 * 3;

const size = 60;
let board_width = board_size * size;
let board_heigth = board_size * size;
const number_button_size = (board_width - 90) / 10;

const offsetX = 30;
const offsetY = 30;

let canvasOffset;

let start = [];

function resetStart() {
	for (let i = 1; i <= board_size; i++) {
		start[i] = [];
		for (let j = 1; j <= board_size; j++) {
			start[i][j] = -1;
		}
	}
}

function resetBoard() {
	for (let i = 1; i <= board_size; i++) {
		board[i] = [];
		for (let j = 1; j <= board_size; j++) {
			board[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		}
	}
}

function resetCollapsed() {
	for (let i = 1; i <= board_size; i++) {
		collapsed[i] = [];
		for (let j = 1; j <= board_size; j++) {
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

	for (let i = 1; i <= 9; i++) {
		let seen = [];
		for (let j = 1; j <= 9; j++) {
			if (seen[start[i][j]]) {
				impossible = true;
				badRow = i;
				badVal = start[i][j];
				return;
			}
			if (start[i][j] > -1) {
				seen[start[i][j]] = true;
			}
		}
	}
	for (let i = 1; i <= 9; i++) {
		let seen = [];
		for (let j = 1; j <= 9; j++) {
			if (seen[start[j][i]]) {
				impossible = true;
				badCol = i;
				badVal = start[j][i];
				return;
			}
			if (start[j][i] > -1) {
				seen[start[j][i]] = true;
			}
		}
	}

	for (let quadRow = 0; quadRow < 3; quadRow++) {
		for (let quadCol = 0; quadCol < 3; quadCol++) {
			let seen = [];
			for (let i = 1; i <= 3; i++) {
				for (let j = 1; j <= 3; j++) {
					let row = quadRow * 3 + i;
					let col = quadCol * 3 + j;
					if (seen[start[row][col]]) {
						impossible = true;
						badQuad = quadRow * 3 + quadCol + 1;
						badVal = start[row][col];
						return;
					}
					if (start[row][col] > -1) {
						seen[start[row][col]] = true;
					}
				}
			}
		}
	}


	for (let i = 1; i <= 9; i++) {
		for (let j = 1; j <= 9; j++) {
			if (start[i][j] > -1) {
				collapse(i, j, start[i][j], true);
			}
		}
	}
}


let selected_i = -1;
let selected_j = -1;

function calculateQuad(i, j) {
	let quadRow = floor((i - 1) / 3);
	let quadCol = floor((j - 1) / 3);
	let quadIndex = quadRow * 3 + quadCol + 1;
	return quadIndex;
}

function startSolving() {
	done = false;
	impossible = false;
	badRow = -1;
	badCol = -1;
	badVal = -1;
	badQuad = -1;
	reset();
}

function handleInput(intValue) {
	start[selected_i][selected_j] = intValue != 0 ? intValue : -1;
	board[selected_i][selected_j] = intValue != 0 ? [intValue] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function keyPressed() {
	charValue = key;
	if (selected_i == -1 || selected_j == -1) return;
	if (charValue >= "0" && charValue <= "9") {
		intValue = charValue - "0";
		handleInput(intValue);
	}
}

function setup() {
	canvas = createCanvas(board_width + 2 * offsetX, board_heigth + 2 * offsetY);
	canvas.parent("centered-canvas");
	canvasOffset = canvas.elt.getBoundingClientRect();

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

	let numbersContainer = createDiv();
	numbersContainer.parent("centered-canvas");
	numbersContainer.style("display", "flex");
	numbersContainer.style("flex-direction", "row");
	numbersContainer.style("gap", "10px");
	numbersContainer.style("margin-top", "15px");

	for (let i = 0; i <= board_size; i++) {
		let numberButton = createButton(i > 0 ? i.toString() : "X");

		numberButton.size(number_button_size, number_button_size);
		numberButton.class("button-style");
		numberButton.mousePressed(() => {
			if (selected_i == -1 || selected_j == -1) return;
			handleInput(i);
		});
		numbersContainer.child(numberButton);
	}

	reset();
}

let done = true;
let impossible = false;
let badRow = -1;
let badCol = -1;
let badQuad = -1;
let badVal = -1;

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

	for (let i = 0; i <= board_size; i++) {
		if (i % 3 == 0) strokeWeight(2);
		else strokeWeight(1);
		line(0, i * size, board_width, i * size);
		line(i * size, 0, i * size, board_heigth);
	}

	textSize(40);
	textAlign(CENTER, CENTER);
	for (let i = 1; i <= board_size; i++) {
		for (let j = 1; j <= board_size; j++) {
			if (start[i][j] != -1) {
				push();
				fill(0, 0, 255);
			}
			if ((badRow == i || badCol == j || badQuad == calculateQuad(i, j)) && badVal == start[i][j]) {
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
			if ((badRow == i || badCol == j || badQuad == calculateQuad(i, j)) && badVal == start[i][j]) {
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
