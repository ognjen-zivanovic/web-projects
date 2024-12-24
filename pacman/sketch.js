
let scene;

function setup() {
	scene = new GameScene();
}

function draw() {
	scene.update();
}

function keyPressed() {
	scene.handeKeyPress(keyCode);
}
