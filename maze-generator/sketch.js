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

function setup() {
	reset();

	for (let i = 0; i < DIM_X * DIM_Y; i++) {
		visited[i] = false;
		done[i] = false;
		graph[i] = [];
		from[i] = -1;
	}

	let startCell = floor(random(DIM_X * DIM_Y));
	visited[startCell] = true;
	cells.push(startCell);

	speedSlider = createSlider(1, 100, SPEED);
	sizeSlider = createSlider(1, 50, SIZE);
}

function update() {
	SPEED = speedSlider.value();
	SIZE = sizeSlider.value();

	for (let m = 0; m < SPEED; m++) {
		if (cells.length === 0) return;
		let currentCell = cells.pop();
		let x = currentCell % DIM_X;
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

	// for (let i = lastVisited; i !== 0 && i !== undefined; i = from[i]) {
	// 	console.log(i);
	// 	for (let k of graph[i]) {
	// 		fill(0, 255, 0);
	// 		let x = i % DIM_X;
	// 		let y = floor(i / DIM_X);
	// 		rect(
	// 			x * SIZE + wallWidth,
	// 			y * SIZE + wallWidth,
	// 			SIZE - 2 * wallWidth,
	// 			SIZE - 2 * wallWidth
	// 		);

	// 		for (let k of graph[i]) {
	// 			if (k === i - DIM_X)
	// 				rect(x * SIZE + wallWidth, y * SIZE, SIZE - 2 * wallWidth, wallWidth);
	// 			if (k === i + DIM_X)
	// 				rect(
	// 					x * SIZE + wallWidth,
	// 					(y + 1) * SIZE - wallWidth,
	// 					SIZE - 2 * wallWidth,
	// 					wallWidth
	// 				);
	// 			if (k === i - 1)
	// 				rect(x * SIZE, y * SIZE + wallWidth, wallWidth, SIZE - 2 * wallWidth);
	// 			if (k === i + 1)
	// 				rect(
	// 					(x + 1) * SIZE - wallWidth,
	// 					y * SIZE + wallWidth,
	// 					wallWidth,
	// 					SIZE - 2 * wallWidth
	// 				);
	// 		}
	// 	}
	// }
}

function keyPressed() {
	if (key === " ") {
		reset();
	}

	if (key === "z") {
		bfs(0);
	}
}

function reset() {
	visited.fill(false);
	done.fill(false);
	graph.forEach((row) => (row.length = 0));
	from.fill(-1);
	cells = [];

	let startCell = floor(random(DIM_X * DIM_Y));
	visited[startCell] = true;
	cells.push(startCell);

	width = Math.floor((windowWidth * 0.96) / SIZE) * SIZE;
	heigth = Math.floor((windowHeight * 0.96) / SIZE) * SIZE;

	createCanvas(width, heigth);
	background(30, 30, 30);
	noStroke();

	DIM_X = width / SIZE;
	DIM_Y = heigth / SIZE;
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

function mousePressed() {
	reset();
}
