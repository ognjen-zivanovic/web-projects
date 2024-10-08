let width = 800;
let height = 800;
let grid = [];

let myShader;
let randomShader;

function preload() {
	myShader = loadShader("shader.vert", "shader.frag");
	randomShader = loadShader("random.vert", "random.frag");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

	pixelDensity(1);
	background(0);
	stroke(255);
	strokeWeight(10);
}

function draw() {
	filterShader(myShader);
}

function mousePressed() {
	randomShader.setUniform("time", millis() / 1000);
	filterShader(randomShader);
}
