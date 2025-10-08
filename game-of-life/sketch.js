let arr = [];
let arr2 = [];
let widthCpu = 20;
let heightCpu = 20;
let pixelSize = 5;

let myShader;
let randomShader;

const CPU = 0;
const GPU = 1;
let MODE = -1;

function preload() {
	myShader = loadShader("shaders/shader.vert", "shaders/shader.frag");
	randomShader = loadShader("shaders/random.vert", "shaders/random.frag");
}

let canvas;

function setupCpu() {
	canvas = createCanvas(widthCpu * pixelSize, heightCpu * pixelSize, P2D);
	canvas.parent("centered-canvas");

	for (let i = 0; i < heightCpu; i++) {
		arr[i] = [];
		arr2[i] = [];
		for (let j = 0; j < widthCpu; j++) {
			arr[i][j] = int(random() > 0.5);
			arr2[i][j] = 0;
		}
	}
}

function setupGpu() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	canvas.parent("centered-canvas");
}

function setup() {
	let controlPanel = createDiv();
	controlPanel.position(0, 0, "absolute");

	let controls = createDiv();
	controls.class("controls");

	let sizeText = createP("Size");
	sizeText.class("label");
	sizeText.style("display", "none");

	let sizeSlider = createSlider(10, 200, 20);
	sizeSlider.class("slider");
	sizeSlider.input(() => {
		widthCpu = sizeSlider.value();
		heightCpu = sizeSlider.value();
		setupCpu();
	});
	sizeSlider.style("display", "none");

	controls.child(sizeText);
	controls.child(sizeSlider);

	let buttonsContainer = createDiv();
	buttonsContainer.class("buttons-container");
	buttonsContainer.style("display", "flex");
	buttonsContainer.style("flex-direction", "row");
	buttonsContainer.style("gap", "20px");

	let cpuButton = createButton("CPU");
	cpuButton.class("button");
	cpuButton.mousePressed(() => {
		MODE = CPU;
		setupCpu();
		sizeSlider.style("display", "block");
		sizeText.style("display", "block");
		buttonsContainer.style("display", "none");
	});

	let gpuButton = createButton("GPU");
	gpuButton.class("button");
	gpuButton.mousePressed(() => {
		MODE = GPU;
		setupGpu();
		sizeSlider.style("display", "none");
		buttonsContainer.style("display", "none");
	});

	buttonsContainer.child(cpuButton);
	buttonsContainer.child(gpuButton);

	controls.child(buttonsContainer);

	controlPanel.child(controls);

	makeDraggablePanel(controlPanel, [sizeSlider], 0);
}

function drawCpu() {
	background(220);
	noStroke();
	for (let i = 0; i < heightCpu; i++) {
		for (let j = 0; j < widthCpu; j++) {
			if (arr[i][j] == 1) {
				fill(0);
			} else {
				fill(255);
			}
			rect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
		}
	}
}

function drawGpu() {
	randomShader.setUniform("time", millis() / 1000);
	filterShader(randomShader);
	filterShader(myShader);
}

function draw() {
	if (MODE == CPU) {
		simulateCpu();
		drawCpu();
	}
	if (MODE == GPU) {
		drawGpu();
	}
}

function simulateCpu() {
	for (let i = 0; i < heightCpu; i++) {
		for (let j = 0; j < widthCpu; j++) {
			let cnt = 0;
			for (let k = -1; k <= 1; k++) {
				for (let l = -1; l <= 1; l++) {
					if (l == 0 && k == 0) continue;
					let p = i + k;
					let q = j + l;
					p = (p + heightCpu) % heightCpu;
					q = (q + widthCpu) % widthCpu;
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

function mouseDragged() {
	if (MODE == CPU) {
		if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) return;
		// find 4 nearest neighbors, in a square
		let x = int(mouseX / pixelSize);
		let y = int(mouseY / pixelSize);
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				let p = x + i;
				let q = y + j;
				p = (p + widthCpu) % widthCpu;
				q = (q + heightCpu) % heightCpu;
				arr[p][q] = int(random() > 0.5);
			}
		}
	} else if (MODE == GPU) {
		resetShader();
		strokeWeight(20);
		stroke(51);
		line(
			pmouseX - windowWidth / 2,
			pmouseY - windowHeight / 2,
			mouseX - windowWidth / 2,
			mouseY - windowHeight / 2
		);
	}
}
