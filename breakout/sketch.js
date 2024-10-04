class Block {
	constructor(x, y, c) {
		this.w = 50;
		this.h = 20;

		this.x = 40 + x * 60;
		this.y = 20 + 30 * y;
		this.c = c;
		this.health = random(3);
	}

	render() {
		fill(color(red(this.c) * this.health, 0, 0));
		rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
	}
}

class Ball {
	constructor(x, y, dx, dy) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;

		this.r = 20;
	}

	render() {
		fill(color(0, 0, 255));
		circle(this.x, this.y, this.r);
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;
	}
}

var blocks = [];
var n = 0;
var ball;
var paddle;

function setup() {
	createCanvas(1280, 720);

	for (let j = 0; j < 15; j++) {
		for (let i = 0; i < 21; i++) {
			blocks[n] = new Block(i, j, color(50, 0, 0));
			n++;
		}
	}

	ball = new Ball(width / 2, (height * 5) / 6 - 20, 7, -7);
	paddle = new Block(10, 20, color(255, 255, 0));
}
function collidey(obj) {
	let dx = abs(ball.x - obj.x);
	let dy = abs(ball.y - obj.y);

	if (dx > obj.w / 2 + ball.r) return false;
	if (dy > obj.h / 2 + ball.r) return false;

	if (dx <= obj.w / 2) return true;
	if (dy <= obj.h / 2) return true;

	let dx2 = dx - obj.w / 2;
	dx2 *= dx2;

	let dy2 = dy - obj.h / 2;
	dy2 *= dy2;

	return dx2 + dy2 <= ball.r * ball.r;
}
function collidex(obj) {
	let dx = abs(ball.x - obj.x);
	let dy = abs(ball.y - obj.y);

	if (dx * obj.h > dy * obj.w) {
		if (ball.h > obj.h) {
			ball.h = obj.h + obj.w / 2 + ball.r;
		} else {
			ball.h = obj.h - obj.w / 2 - ball.r;
		}
		return true;
	} else {
		if (ball.y > obj.y) {
			ball.y = obj.y + obj.h / 2 + ball.r;
		} else {
			ball.y = obj.y - obj.h / 2 - ball.r;
		}
		return false;
	}
}

function update() {
	ball.update();
	let hity = false;
	let hitx = false;
	for (let i = 0; i < n; i++) {
		if (collidey(blocks[i])) {
			hity = true;

			hitx = collidex(blocks[i]);

			blocks[i].health -= 1;
			if (blocks[i].health <= 0) {
				blocks.splice(i, 1);
				i--;
				n--;
			}
		}
	}
	if (collidey(paddle)) {
		hity = true;
		if (collidex(paddle)) {
			hitx = true;
		}
	}
	if (hity) {
		ball.dy *= -1;
	}
	if (hitx) {
		ball.dx *= -1;
	}

	if (ball.x < 0 || ball.x > width) {
		ball.x = constrain(ball.x, ball.r, width - ball.r);
		ball.dx *= -1;
	}
	if (ball.y < 0) {
		ball.y = constrain(ball.y, ball.r, height - ball.r);
		ball.dy *= -1;
	}

	if (ball.y > height) {
		//noLoop();
		//console.log("you lost");
		ball.dy *= -1;
	}

	paddle.x = mouseX;
}

function draw() {
	update();

	background(220);
	for (let i = 0; i < n; i++) {
		blocks[i].render();
	}
	paddle.render();
	ball.render();
}
