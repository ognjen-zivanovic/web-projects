let pacman, ghost;
let walls = [];
let coins = [];
let fruits = [];
let mapData;
let score = 0;
let canEatGhost = false;
let ghostTimer = 0.0;
let constants = {
	size: 40,
	speed: 3,
	fruitDuration: 5,
};

function preload() {
	pacmanImg = loadImage("pacman.png");
	ghostImg = loadImage("ghost.png");
}

function setup() {
	createCanvas(920, 920);
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
	background(0);
	displayMap();
	handleTimers();
	moveCharacters();
	checkCollisions();
}

function loadMap() {
	for (let row = 0; row < mapData.length; row++) {
		for (let col = 0; col < mapData[0].length; col++) {
			switch (mapData[row][col]) {
				case "p":
					pacman = new Character(col * constants.size, row * constants.size, pacmanImg);
					coins.push(new Circle(col * constants.size, row * constants.size));
					break;
				case "m":
					ghost = new Character(col * constants.size, row * constants.size, ghostImg);
					break;
				case "#":
					walls.push(new Wall(col * constants.size, row * constants.size));
					break;
				case " ":
					coins.push(new Circle(col * constants.size, row * constants.size));
					break;
				case "@":
					fruits.push(new Circle(col * constants.size, row * constants.size, true));
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
	pacman.move();
	ghost.move();
}

function checkCollisions() {
	for (let i = coins.length - 1; i >= 0; i--) {
		if (pacman.intersects(coins[i])) {
			coins.splice(i, 1);
			score++;
		}
	}

	for (let i = fruits.length - 1; i >= 0; i--) {
		if (pacman.intersects(fruits[i])) {
			fruits.splice(i, 1);
			score += 2;
			canEatGhost = true;
			ghostTimer = constants.fruitDuration;
		}
	}

	if (pacman.intersects(ghost)) {
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

class Character {
	constructor(x, y, img) {
		this.x = x;
		this.y = y;
		this.img = img;
		this.size = constants.size;
		this.direction = createVector(0, 0);
	}

	move() {
		this.x += this.direction.x * constants.speed;
		this.y += this.direction.y * constants.speed;
	}

	show() {
		image(this.img, this.x, this.y, this.size, this.size);
	}

	intersects(other) {
		return dist(this.x, this.y, other.x, other.y) < this.size;
	}
}

class Circle {
	constructor(x, y, isFruit = false) {
		this.x = x;
		this.y = y;
		this.size = constants.size / 2;
		this.isFruit = isFruit;
	}

	show() {
		fill(this.isFruit ? "red" : "yellow");
		ellipse(this.x + this.size, this.y + this.size, this.size, this.size);
	}
}

class Wall {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = constants.size;
	}

	show() {
		fill(255);
		rect(this.x, this.y, this.size, this.size);
	}
}
