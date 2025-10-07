let DIM_X = 50;
let DIM_Y = 50;
let SIZE = 20;
let SPEED = 50;
let tiles = [];
let allTiles = [];
let grid = [];
let allowedTiles = [];
let done = false;

let UP_DIR = 0;
let RIGHT_DIR = 1;
let DOWN_DIR = 2;
let LEFT_DIR = 3;

const PIPES = 1;
const CIRCLES = 2;
const CIRCUIT = 3;

let MODE = PIPES;

class Cell {
	constructor(x, y, numNeighbours) {
		this.x = x;
		this.y = y;
		this.collapsed = false;
		this.possibleNeighbours = Array.from(Array(numNeighbours).keys());
		this.tileID = 0;
	}

	draw() {
		if (this.collapsed) {
			tiles[this.tileID].draw(this.x * SIZE, this.y * SIZE);
		}
	}

	setAllowedNeighbours(newNeighbours) {
		this.possibleNeighbours = this.possibleNeighbours.filter((n) => newNeighbours.includes(n));
	}
}

class Tile {
	constructor(imagePath, edges, rotation = 0) {
		this.image = loadImage(imagePath);
		this.imagePath = imagePath;
		this.edges = edges;
		this.rotation = rotation;
	}

	draw(x, y) {
		push();
		imageMode(CENTER);
		translate(x + SIZE / 2, y + SIZE / 2);
		rotate((PI / 180) * this.rotation);
		image(this.image, 0, 0, SIZE, SIZE);
		pop();
	}

	rotate(times) {
		let newEdges = [...this.edges];
		for (let i = 0; i < times; i++) {
			newEdges.unshift(newEdges.pop());
		}
		return new Tile(this.imagePath, newEdges, this.rotation + times * 90);
	}
}

function loadTilesType(tilesType) {
	allTiles[tilesType] = [];
	tiles = allTiles[tilesType];
	if (tilesType === PIPES) {
		tiles.push(new Tile("pipes/0.png", ["0", "0", "0", "0"]));
		tiles.push(new Tile("pipes/1.png", ["0", "1", "0", "1"]));
		tiles.push(new Tile("pipes/2.png", ["0", "1", "1", "1"]));
		tiles.push(new Tile("pipes/3.png", ["1", "1", "0", "0"]));
		tiles.push(new Tile("pipes/4.png", ["1", "1", "1", "1"]));

		// Add rotated versions of tiles
		tiles.push(tiles[2].rotate(1));
		tiles.push(tiles[2].rotate(2));
		tiles.push(tiles[2].rotate(3));

		tiles.push(tiles[3].rotate(1));
		tiles.push(tiles[3].rotate(2));
		tiles.push(tiles[3].rotate(3));
	} else if (tilesType === CIRCLES) {
		tiles.push(new Tile("circles/0.png", ["0", "0", "0", "0"]));
		tiles.push(new Tile("circles/1.png", ["0", "1", "1", "1"]));
		tiles.push(new Tile("circles/2.png", ["0", "1", "0", "1"]));
		tiles.push(new Tile("circles/3.png", ["0", "0", "1", "1"]));

		tiles.push(tiles[2].rotate(1));

		tiles.push(tiles[1].rotate(1));
		tiles.push(tiles[1].rotate(2));
		tiles.push(tiles[1].rotate(3));

		tiles.push(tiles[3].rotate(1));
		tiles.push(tiles[3].rotate(2));
		tiles.push(tiles[3].rotate(3));

		tiles.push(new Tile("circles/4.png", ["1", "1", "1", "1"]));
		tiles.push(new Tile("circles/5.png", ["1", "0", "0", "0"]));
		tiles.push(new Tile("circles/6.png", ["1", "0", "1", "0"]));
		tiles.push(new Tile("circles/7.png", ["1", "1", "0", "0"]));

		tiles.push(tiles[13].rotate(1));

		tiles.push(tiles[12].rotate(1));
		tiles.push(tiles[12].rotate(2));
		tiles.push(tiles[12].rotate(3));

		tiles.push(tiles[14].rotate(1));
		tiles.push(tiles[14].rotate(2));
		tiles.push(tiles[14].rotate(3));
	} else if (tilesType === CIRCUIT) {
		tiles.push(new Tile("circuit/1.png", ["AAA", "AAA", "AAA", "AAA"]));
		tiles.push(new Tile("circuit/2.png", ["BDB", "BCB", "BDB", "BCB"]));
		tiles.push(new Tile("circuit/3.png", ["BDB", "BBA", "AAA", "ABB"]));
		tiles.push(new Tile("circuit/4.png", ["BBB", "BBB", "BBA", "ABB"]));
		tiles.push(new Tile("circuit/5.png", ["BDB", "BDB", "BDB", "BDB"]));
		tiles.push(new Tile("circuit/6.png", ["BDB", "BDB", "BBB", "BBB"]));
		tiles.push(new Tile("circuit/7.png", ["BBB", "BBB", "BBB", "BBB"]));
		tiles.push(new Tile("circuit/8.png", ["BBB", "BDB", "BDB", "BDB"]));
		tiles.push(new Tile("circuit/9.png", ["BDB", "BBB", "BDB", "BBB"]));
		tiles.push(new Tile("circuit/10.png", ["BCB", "BBB", "BDB", "BBB"]));
		tiles.push(new Tile("circuit/11.png", ["BDB", "BDB", "BBB", "BBB"]));
		tiles.push(new Tile("circuit/12.png", ["BBB", "BDB", "BBB", "BDB"]));
		tiles.push(new Tile("circuit/13.png", ["BDB", "BBB", "BBB", "BBB"]));
		tiles.push(new Tile("circuit/14.png", ["BBB", "BCB", "BBB", "BCB"]));

		// Rotations
		tiles.push(tiles[1].rotate(1));

		tiles.push(tiles[2].rotate(1));
		tiles.push(tiles[2].rotate(2));
		tiles.push(tiles[2].rotate(3));

		tiles.push(tiles[3].rotate(1));
		tiles.push(tiles[3].rotate(2));
		tiles.push(tiles[3].rotate(3));

		tiles.push(tiles[4].rotate(1));

		tiles.push(tiles[5].rotate(1));
		tiles.push(tiles[5].rotate(2));
		tiles.push(tiles[5].rotate(3));

		tiles.push(tiles[7].rotate(1));
		tiles.push(tiles[7].rotate(2));
		tiles.push(tiles[7].rotate(3));

		tiles.push(tiles[8].rotate(1));

		tiles.push(tiles[9].rotate(1));
		tiles.push(tiles[9].rotate(2));
		tiles.push(tiles[9].rotate(3));

		tiles.push(tiles[10].rotate(1));
		tiles.push(tiles[10].rotate(2));
		tiles.push(tiles[10].rotate(3));

		tiles.push(tiles[11].rotate(1));

		tiles.push(tiles[12].rotate(1));
		tiles.push(tiles[12].rotate(2));
		tiles.push(tiles[12].rotate(3));

		tiles.push(tiles[13].rotate(1));
	}
}

function loadTiles() {
	loadTilesType(PIPES);
	loadTilesType(CIRCLES);
	loadTilesType(CIRCUIT);
	tiles = allTiles[MODE];
}

function preload() {
	loadTiles();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function setupGraph() {
	// Setup allowedTiles logic
	for (let i = 0; i < tiles.length; i++) {
		allowedTiles[i] = [];
		for (let j = 0; j < 4; j++) {
			allowedTiles[i][j] = [];
			for (let k = 0; k < tiles.length; k++) {
				let a = tiles[i].edges[j];
				let b = tiles[k].edges[(j + 2) % 4].split("").reverse().join("");
				if (a === b) {
					allowedTiles[i][j].push(k);
				}
			}
		}
	}

	DIM_X = ceil(windowWidth / SIZE);
	DIM_Y = ceil(windowHeight / SIZE);
	grid = [];
	for (let y = 0; y < DIM_Y; y++) {
		grid[y] = [];
		for (let x = 0; x < DIM_X; x++) {
			grid[y][x] = new Cell(x, y, tiles.length);
		}
	}
	background(100);
}

function reset() {
	done = false;
	tiles = allTiles[MODE];
	setupGraph();
}

function setup() {
	setupGraph();

	controlPanel = createDiv();
	controlPanel.position(0, 0, "absolute");

	controls = createDiv();
	controls.class("controls");

	// Create labels
	speedText = createP("Speed");
	sizeText = createP("Size");

	speedText.class("label");
	sizeText.class("label");

	// Create sliders
	speedSlider = createSlider(1, 100, SPEED);
	sizeSlider = createSlider(1, 50, SIZE);

	speedSlider.class("slider");
	sizeSlider.class("slider");

	speedSlider.input(() => {
		SPEED = speedSlider.value();
	});
	sizeSlider.input(() => {
		SIZE = sizeSlider.value();
		reset();
	});

	// add buttons
	resetButton = createButton("Reset");
	resetButton.mousePressed(reset);
	resetButton.class("button");

	radioButtonsContainer = createDiv();
	radioButtonsContainer.style("display", "flex");
	radioButtonsContainer.style("flex-direction", "row");
	radioButtonsContainer.style("gap", "1rem");

	circuitButton = createButton("Circuit");
	circuitButton.class("button");
	pipesButton = createButton("Pipes");
	pipesButton.class("button");
	circlesButton = createButton("Circles");
	circlesButton.class("button");

	radioButtonsContainer.child(circuitButton);
	radioButtonsContainer.child(pipesButton);
	radioButtonsContainer.child(circlesButton);

	pipesButton.mousePressed(function () {
		MODE = PIPES;
		pipesButton.style("background-color", "#aaa");
		circuitButton.style("background-color", "");
		circlesButton.style("background-color", "");
	});

	circuitButton.mousePressed(function () {
		MODE = CIRCUIT;
		circuitButton.style("background-color", "#aaa");
		pipesButton.style("background-color", "");
		circlesButton.style("background-color", "");
	});

	circlesButton.mousePressed(function () {
		MODE = CIRCLES;
		circlesButton.style("background-color", "#aaa");
		pipesButton.style("background-color", "");
		circuitButton.style("background-color", "");
	});

	if (MODE === PIPES) {
		pipesButton.style("background-color", "#aaa");
	} else if (MODE === CIRCUIT) {
		circuitButton.style("background-color", "#aaa");
	} else if (MODE === CIRCLES) {
		circlesButton.style("background-color", "#aaa");
	}

	// Add them to the controls div in order
	controls.child(speedText);
	controls.child(speedSlider);
	controls.child(sizeText);
	controls.child(sizeSlider);
	controls.child(resetButton);

	controls.child(radioButtonsContainer);

	controlPanel.child(controls);
	makeDraggablePanel(controlPanel, [speedSlider, sizeSlider], 15);

	resizeCanvas(windowWidth, windowHeight);
}

function update() {
	if (done) return;

	for (let i = 0; i < SPEED; i++) {
		let cellsWithLeastEntropy = [];
		let minEntropy = Infinity;

		for (let y = 0; y < DIM_Y; y++) {
			for (let x = 0; x < DIM_X; x++) {
				let cell = grid[y][x];
				if (cell.collapsed) continue;
				let entropy = cell.possibleNeighbours.length;
				if (entropy < minEntropy) {
					minEntropy = entropy;
					cellsWithLeastEntropy = [cell];
				} else if (entropy === minEntropy) {
					cellsWithLeastEntropy.push(cell);
				}
			}
		}

		if (cellsWithLeastEntropy.length === 0) {
			done = true;
			return;
		}

		let randomCell = random(cellsWithLeastEntropy);
		randomCell.collapsed = true;
		if (minEntropy === 0) {
			return;
		}
		randomCell.tileID = random(randomCell.possibleNeighbours);
		randomCell.possibleNeighbours = [randomCell.tileID];
		randomCell.draw();

		let x = randomCell.x;
		let y = randomCell.y;

		if (x > 0) grid[y][x - 1].setAllowedNeighbours(allowedTiles[randomCell.tileID][LEFT_DIR]);
		if (x < DIM_X - 1)
			grid[y][x + 1].setAllowedNeighbours(allowedTiles[randomCell.tileID][RIGHT_DIR]);
		if (y > 0) grid[y - 1][x].setAllowedNeighbours(allowedTiles[randomCell.tileID][UP_DIR]);
		if (y < DIM_Y - 1)
			grid[y + 1][x].setAllowedNeighbours(allowedTiles[randomCell.tileID][DOWN_DIR]);
	}
}

function draw() {
	update();
}
