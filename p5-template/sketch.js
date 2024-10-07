let pacman, ghost;
let walls = [];
let coins = [];
let fruits = [];
let mapData;
let score = 0;
let id = 0;
let canEatGhost = false;
let ghostTimer = 0.0;
let constants = {
	size: 40,
	speed: 300,
	fruitDuration: 5,
};

function preload() {
	pacmanImg = loadImage("pacman.png");
	ghostImg = loadImage("ghost.png");
}

function setup() {
	createCanvas(920, 1000);
	mapData = [
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
		],
		[
			"#",
			"@",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			"@",
			"#",
		],
		[
			"#",
			" ",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			" ",
			"#",
		],
		[
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
		],
		[
			"#",
			" ",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			" ",
			"#",
		],
		[
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"!",
			"#",
			"#",
			"#",
			"!",
			"#",
			"#",
			"#",
			"!",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"#",
			"!",
			"!",
			"m",
			"!",
			"!",
			"#",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"!",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"!",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"!",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"!",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"!",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"!",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"!",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
		[
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
		],
		[
			"#",
			" ",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			"#",
			"#",
			" ",
			"#",
		],
		[
			"#",
			"@",
			" ",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"p",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"@",
			"#",
		],
		[
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
		],
		[
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
		],
		[
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
		],
		[
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
			" ",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			" ",
			"#",
		],
		[
			"#",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			" ",
			"#",
		],
		[
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
			"#",
		],
	];

	loadMap();
}

function draw() {
	deltaTime /= 1000;
	background(0);
	displayMap();
	handleTimers();
	moveCharacters();
	checkCollisions();
}

function loadMap() {
	pacman = new Character(0, 0, 0.85 * constants.size, 0.85 * constants.size, pacmanImg);
	ghost = new Character(0, 0, 0.85 * constants.size, 0.85 * constants.size, ghostImg);
	for (let row = 0; row < mapData.length; row++) {
		for (let col = 0; col < mapData[0].length; col++) {
			switch (mapData[row][col]) {
				case "p":
					pacman.x = col * constants.size;
					pacman.y = row * constants.size;
					coins.push(
						new Circle(
							col * constants.size,
							row * constants.size,
							constants.size / 3,
							color(255, 255, 0)
						)
					);
					break;
				case "m":
					ghost.x = col * constants.size;
					ghost.y = row * constants.size;
					break;
				case "#":
					walls.push(
						new Wall(
							col * constants.size,
							row * constants.size,
							constants.size,
							constants.size,
							color(0, 0, 255)
						)
					);
					break;
				case " ":
					coins.push(
						new Circle(
							col * constants.size,
							row * constants.size,
							constants.size / 3,
							color(255, 255, 0)
						)
					);
					break;
				case "@":
					fruits.push(
						new Circle(
							col * constants.size,
							row * constants.size,
							constants.size / 2.5,
							color(255, 0, 0)
						)
					);
					break;
			}
		}
	}
}

function displayMap() {
	walls.forEach((wall) => wall.show());
	coins.forEach((coin) => coin.show());
	fruits.forEach((fruit) => fruit.show());

	pacman.show();
	ghost.show();
}

function moveCharacters() {
	moveCharacter(pacman);
	moveCharacter(ghost);
}

function moveCharacter(objekat) {
	if (objekat.x < 0) {
		objekat.x = (mapData[0].length - 1) * constants.size;
	}
	if (objekat.x > (mapData[0].length - 1) * constants.size) {
		objekat.x = 0;
	}

	let collided = false;
	let differentDirections = false;

	if (objekat.nextDirection !== objekat.direction) {
		switch (objekat.nextDirection) {
			case "LEFT":
				objekat.x -= objekat.w;
				break;
			case "RIGHT":
				objekat.x += objekat.w;
				break;
			case "UP":
				objekat.y -= objekat.h;
				break;
			case "DOWN":
				objekat.y += objekat.h;
				break;
		}
		differentDirections = true;
	} else {
		switch (objekat.nextDirection) {
			case "LEFT":
				objekat.x -= constants.speed * deltaTime;
				break;
			case "RIGHT":
				objekat.x += constants.speed * deltaTime;
				break;
			case "UP":
				objekat.y -= constants.speed * deltaTime;
				break;
			case "DOWN":
				objekat.y += constants.speed * deltaTime;
				break;
		}
	}

	for (let wall of walls) {
		if (collides(objekat, wall)) {
			if (!differentDirections) {
				switch (objekat.nextDirection) {
					case "LEFT":
						objekat.x = wall.x + wall.w;
						break;
					case "RIGHT":
						objekat.x = wall.x - objekat.w;
						break;
					case "UP":
						objekat.y = wall.y + wall.h;
						break;
					case "DOWN":
						objekat.y = wall.y - objekat.h;
						break;
				}
			} else {
				switch (objekat.nextDirection) {
					case "LEFT":
						objekat.x += objekat.w;
						break;
					case "RIGHT":
						objekat.x -= objekat.w;
						break;
					case "UP":
						objekat.y += objekat.h;
						break;
					case "DOWN":
						objekat.y -= objekat.h;
						break;
				}
			}
			collided = true;
		}
	}

	if (!collided) {
		if (objekat.direction !== objekat.nextDirection) {
			switch (objekat.nextDirection) {
				case "LEFT":
					objekat.x += objekat.w;
					objekat.x -= constants.speed * deltaTime;
					break;
				case "RIGHT":
					objekat.x -= objekat.w;
					objekat.x += constants.speed * deltaTime;
					break;
				case "UP":
					objekat.y += objekat.h;
					objekat.y -= constants.speed * deltaTime;
					break;
				case "DOWN":
					objekat.y -= objekat.h;
					objekat.y += constants.speed * deltaTime;
					break;
			}
		}

		if (objekat.nextDirection !== "NONE") {
			objekat.direction = objekat.nextDirection;
			return collided;
		}

		switch (objekat.nextDirection) {
			case "LEFT":
				objekat.angle = 270;
				break;
			case "RIGHT":
				objekat.angle = 90;
				break;
			case "UP":
				objekat.angle = 0;
				break;
			case "DOWN":
				objekat.angle = 180;
				break;
		}
	} else {
		switch (objekat.direction) {
			case "LEFT":
				objekat.x -= constants.speed * deltaTime;
				break;
			case "RIGHT":
				objekat.x += constants.speed * deltaTime;
				break;
			case "UP":
				objekat.y -= constants.speed * deltaTime;
				break;
			case "DOWN":
				objekat.y += constants.speed * deltaTime;
				break;
		}

		for (let wall of walls) {
			if (collides(objekat, wall)) {
				switch (objekat.direction) {
					case "LEFT":
						objekat.x = wall.x + wall.w;
						break;
					case "RIGHT":
						objekat.x = wall.x - objekat.w;
						break;
					case "UP":
						objekat.y = wall.y + wall.h;
						break;
					case "DOWN":
						objekat.y = wall.y - objekat.h;
						break;
				}
				collided = true;
			}
		}
	}

	return collided;
}

function collides(objekat, wall) {
	return (
		objekat.x < wall.x + wall.w &&
		objekat.x + objekat.w > wall.x &&
		objekat.y < wall.y + wall.h &&
		objekat.y + objekat.h > wall.y
	);
}
function CollisionObjectObject(a, b) {
	return (
		((a.x + a.w > b.x && a.x + a.w < b.x + b.w) || (a.x < b.x + b.w && a.x > b.x)) &&
		((a.y + a.h > b.y && a.y + a.h < b.y + b.h) || (a.y < b.y + b.h && a.y > b.y))
	);
}
function CollisionObjectCircle(a, b) {
	return (
		((a.x + a.w >= b.x && a.x + a.w <= b.x + b.w) || (a.x <= b.x + b.w && a.x >= b.x)) &&
		((a.y + a.h >= b.y && a.y + a.h <= b.y + b.h) || (a.y <= b.y + b.h && a.y >= b.y))
	);
}
function CollisionCharacterCharacter(a, b) {
	return (
		((a.x + a.w >= b.x && a.x + a.w <= b.x + b.w) || (a.x <= b.x + b.w && a.x >= b.x)) &&
		((a.y + a.h >= b.y && a.y + a.h <= b.y + b.h) || (a.y <= b.y + b.h && a.y >= b.y))
	);
}

function checkCollisions() {
	for (let i = coins.length - 1; i >= 0; i--) {
		if (CollisionObjectCircle(pacman, coins[i])) {
			coins.splice(i, 1);
			score++;
		}
	}

	for (let i = fruits.length - 1; i >= 0; i--) {
		if (CollisionObjectCircle(pacman, fruits[i])) {
			fruits.splice(i, 1);
			score += 2;
			canEatGhost = true;
			ghostTimer = constants.fruitDuration;
		}
	}

	if (CollisionCharacterCharacter(pacman, ghost)) {
		if (canEatGhost) {
			alert("You won! Your score: " + score);
			noLoop();
		} else {
			alert("Game Over");
			noLoop();
		}
	}

	if (coins.length === 0 && fruits.length === 0) {
		alert("You won! Your score: " + score);
		noLoop();
	}
}

function handleTimers() {
	if (canEatGhost) {
		ghostTimer -= deltaTime / 1000;
		if (ghostTimer < 0) {
			canEatGhost = false;
		}
	}
}

function Snap(a, val = constants.size) {
	return floor(a / val) * val;
}

class Character {
	constructor(x, y, w, h, img) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.w = w;
		this.h = h;
		this.direction;
	}

	show() {
		let draw_x = this.x;
		let draw_y = this.y;
		switch (this.direction) {
			case "LEFT":
				draw_y = Snap(draw_y);
				break;
			case "RIGHT":
				draw_x = draw_x - floor(constants.size - this.w);
				draw_y = Snap(draw_y);
				break;
			case "UP":
				draw_x = Snap(draw_x);
				break;
			case "DOWN":
				draw_x = Snap(draw_x);
				draw_y = draw_y - floor(constants.size - this.h);
				break;
		}
		image(this.img, draw_x, draw_y, constants.size, constants.size);
	}
}

class Circle {
	constructor(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.w = 2 * r;
		this.h = 2 * r;
		this.color = color;
	}

	show() {
		let draw_x = Snap(this.x) + (constants.size - 2 * this.r) / 2;
		let draw_y = Snap(this.y) + (constants.size - 2 * this.r) / 2;
		let draw_r = 2 * this.r;

		fill(this.color);
		ellipse(draw_x + this.w / 2, draw_y + this.h / 2, draw_r, draw_r);
	}
}

class Wall {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	show() {
		push();
		fill(0, 0, 255);
		noStroke();
		rect(this.x, this.y, this.w, this.h);
		pop();
	}
}

function keyPressed() {
	switch (keyCode) {
		case ESCAPE:
			exit(); // to exit the program in p5.js, you might just stop execution or reset the state
			break;
		case UP_ARROW:
			pacman.nextDirection = "UP";
			break;
		case LEFT_ARROW:
			pacman.nextDirection = "LEFT";
			break;
		case DOWN_ARROW:
			pacman.nextDirection = "DOWN";
			break;
		case RIGHT_ARROW:
			pacman.nextDirection = "RIGHT";
			break;
		case 87: // 'W' key
			ghost.nextDirection = "UP";
			break;
		case 65: // 'A' key
			ghost.nextDirection = "LEFT";
			break;
		case 83: // 'S' key
			ghost.nextDirection = "DOWN";
			break;
		case 68: // 'D' key
			ghost.nextDirection = "RIGHT";
			break;
	}
}
