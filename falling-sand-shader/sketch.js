let width = 800;
let height = 800;
let grid = [];

let myShader;

function preload() {
	myShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
	createCanvas(width, height, WEBGL);

	// pixelDensity(1);
	// noSmooth();
	// background(0);
	// stroke(255);

	pixelDensity(1);
	background(0);
	stroke(255);
	strokeWeight(10);
}

function update() {}

function draw() {
	if (mouseIsPressed) {
		strokeWeight(20);
		line(pmouseX - width / 2, pmouseY - height / 2, mouseX - width / 2, mouseY - height / 2);
	}

	filterShader(myShader);
}
