let DIM_X;
let DIM_Y;
let SIZE;
let SPEED;
let visited = [];
let done = [];
let graph = [];
let cells = [];
let from = [];
let lastVisited;
let speedSlider;

function preload() {
	SPEED = 20;
	SIZE = 10;
}

function resetGraph() {
	for (let i = 0; i < DIM_X * DIM_Y; i++) {
		visited[i] = false;
		done[i] = false;
		graph[i] = [];
		from[i] = -1;
		cells = [];
	}

	let startCell = floor(random(DIM_X * DIM_Y));
	visited[startCell] = true;
	cells.push(startCell);
}

function setup() {
	reset();

	let controlPanel = createDiv();
	controlPanel.position(0, 0, "absolute");

	let controls = createDiv();
	controls.style("background-color", "rgb(10, 10, 10)");
	controls.style("padding", "0.75rem");
	controls.style("border-radius", "0.5rem");

	// Use flexbox for layout
	controls.style("display", "flex");
	controls.style("flex-direction", "column");
	controls.style("gap", "0.3rem");

	// Create labels
	speedText = createP("Speed");
	sizeText = createP("Size");

	speedText.class("label-text");
	sizeText.class("label-text");

	// Create sliders
	speedSlider = createSlider(1, 100, SPEED);
	sizeSlider = createSlider(1, 50, SIZE);

	speedSlider.class("slider");
	sizeSlider.class("slider");

	speedSlider.input(onSpeedChange);
	sizeSlider.input(onSizeChange);

	// Add them to the controls div in order
	controls.child(speedText);
	controls.child(speedSlider);
	controls.child(sizeText);
	controls.child(sizeSlider);

	resetButton = createButton("Reset");
	resetButton.mousePressed(reset);
	resetButton.style("padding", "0.5rem");
	resetButton.style("margin-top", "0.25rem");
	resetButton.style("font-size", "1.5rem");
	controls.child(resetButton);

	controlPanel.child(controls);
	makeDraggablePanel(controlPanel, [speedSlider, sizeSlider], 25);
}

function onSpeedChange() {
	SPEED = speedSlider.value();
}

function onSizeChange() {
	SIZE = sizeSlider.value();
	reset();
}

function update() {
	for (let m = 0; m < SPEED; m++) {
		if (cells.length === 0) return;
		let currentCell = cells.pop();
		let x = floor(currentCell % DIM_X);
		let y = floor(currentCell / DIM_X);
		let possibleNeighbours = [];

		if (x > 0 && !visited[y * DIM_X + x - 1]) possibleNeighbours.push(y * DIM_X + x - 1);
		if (x < DIM_X - 1 && !visited[y * DIM_X + x + 1])
			possibleNeighbours.push(y * DIM_X + x + 1);
		if (y > 0 && !visited[(y - 1) * DIM_X + x]) possibleNeighbours.push((y - 1) * DIM_X + x);
		if (y < DIM_Y - 1 && !visited[(y + 1) * DIM_X + x])
			possibleNeighbours.push((y + 1) * DIM_X + x);

		if (possibleNeighbours.length === 0) {
			done[currentCell] = true;
			drawCell(y, x);
			continue;
		}

		cells.push(currentCell);
		let randIndex = floor(random(possibleNeighbours.length));
		let randCell = possibleNeighbours[randIndex];

		graph[currentCell].push(randCell);
		graph[randCell].push(currentCell);
		visited[randCell] = true;
		cells.push(randCell);

		drawCell(y, x);
	}
}

function drawCell(y, x) {
	let wallWidth = SIZE / 5;

	let location = y * DIM_X + x;
	fill(0);
	noStroke();
	rect(x * SIZE, y * SIZE, SIZE, SIZE);

	if (graph[location].length > 0) {
		fill(0, 0, 255);
		if (done[location]) fill(255);
		rect(
			x * SIZE + wallWidth,
			y * SIZE + wallWidth,
			SIZE - 2 * wallWidth,
			SIZE - 2 * wallWidth
		);

		for (let k of graph[location]) {
			if (k === location - DIM_X)
				rect(x * SIZE + wallWidth, y * SIZE, SIZE - 2 * wallWidth, wallWidth);
			if (k === location + DIM_X)
				rect(
					x * SIZE + wallWidth,
					(y + 1) * SIZE - wallWidth,
					SIZE - 2 * wallWidth,
					wallWidth
				);
			if (k === location - 1)
				rect(x * SIZE, y * SIZE + wallWidth, wallWidth, SIZE - 2 * wallWidth);
			if (k === location + 1)
				rect(
					(x + 1) * SIZE - wallWidth,
					y * SIZE + wallWidth,
					wallWidth,
					SIZE - 2 * wallWidth
				);
		}
	}
}

function draw() {
	update();
}

function reset() {
	width = windowWidth;
	heigth = windowHeight;

	DIM_X = floor(width / SIZE);
	DIM_Y = floor(heigth / SIZE);

	resetGraph();

	let startCell = floor(random(DIM_X * DIM_Y));
	visited[startCell] = true;
	cells.push(startCell);

	//	width = Math.floor((windowWidth * 0.96) / SIZE) * SIZE;
	//	heigth = Math.floor((windowHeight * 0.96) / SIZE) * SIZE;

	createCanvas(width, heigth);
	background(30, 30, 30);
	noStroke();
}

function bfs(x) {
	lastVisited = max(lastVisited, x);

	let q = [];
	q.push(x);
	visited[x] = true;

	while (q.length > 0) {
		let currentCell = q.shift();
		visited[currentCell] = true;
		lastVisited = max(lastVisited, currentCell);

		for (let a of graph[currentCell]) {
			if (!visited[a]) {
				q.push(a);
				from[a] = currentCell;
			}
		}
	}
}
