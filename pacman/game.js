class GameScene {
	constructor() {
		this.walls = [];
		this.coins = [];
		this.fruits = [];

		this.pacmanImg = loadImage("pacman.png");
		this.ghostImg = loadImage("ghost.png");

		this.score = 0;
		this.canEatGhost = false;
		this.ghostTimer = 0.0;

		this.mapData = [
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

		this.screenHeight = this.mapData.length * constants.size;
		this.screenWidth = this.mapData[0].length * constants.size;

		this.setup();
	}

	setup() {
		createCanvas(this.screenWidth, this.screenHeight);
		this.loadMap();
	}

	update() {
		this.deltaTime = deltaTime /= 1000;
		background(0);

		this.draw();
		this.handleTimers();
		this.moveCharacters();
		this.checkCollisions();
	}

	draw() {
		if (this.canEatGhost) {
			background(255, 0, 0);
		}
		this.walls.forEach((wall) => wall.show());
		this.coins.forEach((coin) => coin.show());
		this.fruits.forEach((fruit) => fruit.show());

		this.pacman.show();
		this.ghost.show();
	}

	loadMap() {
		this.pacman = new Character(
			0,
			0,
			0.85 * constants.size,
			0.85 * constants.size,
			this.pacmanImg
		);
		this.ghost = new Character(
			0,
			0,
			0.85 * constants.size,
			0.85 * constants.size,
			this.ghostImg
		);
		for (let row = 0; row < this.mapData.length; row++) {
			for (let col = 0; col < this.mapData[0].length; col++) {
				switch (this.mapData[row][col]) {
					case "p":
						this.pacman.x = col * constants.size;
						this.pacman.y = row * constants.size;
						this.coins.push(
							new Circle(
								col * constants.size,
								row * constants.size,
								constants.size / 3,
								color(255, 255, 0)
							)
						);
						break;
					case "m":
						this.ghost.x = col * constants.size;
						this.ghost.y = row * constants.size;
						break;
					case "#":
						this.walls.push(
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
						this.coins.push(
							new Circle(
								col * constants.size,
								row * constants.size,
								constants.size / 3,
								color(255, 255, 0)
							)
						);
						break;
					case "@":
						this.fruits.push(
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

	moveCharacters() {
		this.moveCharacter(this.pacman);
		this.moveCharacter(this.ghost);
	}

	moveCharacter(objekat) {
		if (objekat.x < 0) {
			objekat.x = (this.mapData[0].length - 1) * constants.size;
		}
		if (objekat.x > (this.mapData[0].length - 1) * constants.size) {
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
					objekat.x -= constants.speed * this.deltaTime;
					break;
				case "RIGHT":
					objekat.x += constants.speed * this.deltaTime;
					break;
				case "UP":
					objekat.y -= constants.speed * this.deltaTime;
					break;
				case "DOWN":
					objekat.y += constants.speed * this.deltaTime;
					break;
			}
		}

		for (let wall of this.walls) {
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
						objekat.x -= constants.speed * this.deltaTime;
						break;
					case "RIGHT":
						objekat.x -= objekat.w;
						objekat.x += constants.speed * this.deltaTime;
						break;
					case "UP":
						objekat.y += objekat.h;
						objekat.y -= constants.speed * this.deltaTime;
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
					objekat.x -= constants.speed * this.deltaTime;
					break;
				case "RIGHT":
					objekat.x += constants.speed * this.deltaTime;
					break;
				case "UP":
					objekat.y -= constants.speed * this.deltaTime;
					break;
				case "DOWN":
					objekat.y += constants.speed * this.deltaTime;
					break;
			}

			for (let wall of this.walls) {
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

	checkCollisions() {
		for (let i = this.coins.length - 1; i >= 0; i--) {
			if (CollisionObjectCircle(this.pacman, this.coins[i])) {
				this.coins.splice(i, 1);
				this.score++;
			}
		}

		for (let i = this.fruits.length - 1; i >= 0; i--) {
			if (CollisionObjectCircle(this.pacman, this.fruits[i])) {
				this.fruits.splice(i, 1);
				this.score += 2;
				this.canEatGhost = true;
				this.ghostTimer = constants.fruitDuration;
			}
		}

		if (CollisionCharacterCharacter(this.pacman, this.ghost)) {
			if (this.canEatGhost) {
				alert("Pobedili ste! Rezultat: " + this.score);
				noLoop();
			} else {
				alert("Izgubili ste!");
				noLoop();
			}
		}

		if (this.coins.length === 0 && this.fruits.length === 0) {
			alert("You won! Your score: " + this.score);
			noLoop();
		}
	}

	handleTimers() {
		if (this.canEatGhost) {
			this.ghostTimer -= this.deltaTime;
			console.log(this.ghostTimer);
			if (this.ghostTimer < 0) {
				this.canEatGhost = false;
			}
		}
	}

	handeKeyPress(keyCode) {
		switch (keyCode) {
			case ESCAPE:
				exit();
				break;
			case UP_ARROW:
				this.pacman.nextDirection = "UP";
				break;
			case LEFT_ARROW:
				this.pacman.nextDirection = "LEFT";
				break;
			case DOWN_ARROW:
				this.pacman.nextDirection = "DOWN";
				break;
			case RIGHT_ARROW:
				this.pacman.nextDirection = "RIGHT";
				break;
			case 87: // 'W' key
				this.ghost.nextDirection = "UP";
				break;
			case 65: // 'A' key
				this.ghost.nextDirection = "LEFT";
				break;
			case 83: // 'S' key
				this.ghost.nextDirection = "DOWN";
				break;
			case 68: // 'D' key
				this.ghost.nextDirection = "RIGHT";
				break;
		}
	}
}
