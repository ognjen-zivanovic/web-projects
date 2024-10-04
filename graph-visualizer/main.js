function setup() {
	width = windowWidth;
	height = windowHeight;
	createCanvas(width, height);

	createUI();

	let numNodes = 20;
	for (let i = 0; i < numNodes; i++) {
		addNode(random() * 5 * optimal_edge_len, random() * 5 * optimal_edge_len);
		angleMode(DEGREES);
		//addNode(cos(i * (360 / numNodes)) * 300, sin(i * (360 / numNodes)) * 300);
	}

	for (let i = 0; i < n; ++i) {
		for (let j = 0; j < n; ++j) {
			if (i == j) d[i][j] = 0;
			else d[i][j] = 10000000;
		}
	}
	let numEdges = 20;
	for (let i = 0; i < numEdges; i++) {
		addEdge(floor(random() * numNodes), floor(random() * numNodes), false);
		//addEdge(i, i + 1 + floor(random() * (numNodes - i - 1)));
	}
}

function draw() {
	background(220);

	update();

	for (let i = 0; i < n; i++) {
		arr[i].draw();
	}

	for (let i = 0; i < m; i++) {
		arr2[i].draw();
	}
}

function update() {
	optimal_edge_len = slider1.value();

	for (var i = 0; i < numIterationsPerframe; i++) {
		simulate();
	}
}
