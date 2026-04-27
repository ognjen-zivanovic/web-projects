
var canvasOffset;
let n = 60;
let m = 60;
const size = 50;

const TOP = 1;
const RIGHT = 2;
const BOTTOM = 4;
const LEFT = 8;

const TOP_RIGHT = TOP + RIGHT;
const BOTTOM_RIGHT = BOTTOM + RIGHT;
const BOTTOM_LEFT = BOTTOM + LEFT;
const TOP_LEFT = TOP + LEFT;

const HORIZONTAL = LEFT + RIGHT;
const VERTICAL = TOP + BOTTOM;

let data = [];
let snakes = [];
let free_cells = [];

let heads = [];

function negate_direction(direction) {
	if (direction === LEFT) {
		return RIGHT;
	} else if (direction === RIGHT) {
		return LEFT;
	} else if (direction === TOP) {
		return BOTTOM;
	} else if (direction === BOTTOM) {
		return TOP;
	}
}

function next_direction(direction) {
	if (direction === TOP) {
		return RIGHT;
	} else if (direction === RIGHT) {
		return BOTTOM;
	} else if (direction === BOTTOM) {
		return LEFT;
	} else if (direction === LEFT) {
		return TOP;
	}
}

function count_free_in_direction(x, y, direction) {
	let cnt = 0;
	if (direction === LEFT) {
		for (let i = x - 1; i >= 0; i--) {
			if (!data[y][i] || data[y][i] == 0) {
				cnt += 1;
			}
			else {
				break;
			}
		}
	}
	else if (direction === RIGHT) {
		for (let i = x + 1; i < m; i++) {
			if (!data[y][i] || data[y][i] == 0) {
				cnt += 1;
			}
			else {
				break;
			}
		}
	}
	else if (direction === TOP) {
		for (let i = y - 1; i >= 0; i--) {
			if (!data[i][x] || data[i][x] == 0) {
				cnt += 1;
			}
			else {
				break;
			}
		}
	} else if (direction === BOTTOM) {
		for (let i = y + 1; i < n; i++) {
			if (!data[i][x] || data[i][x] == 0) {
				cnt += 1;
			}
			else {
				break;
			}
		}
	}
	return cnt;
}

function get_dx_dy(direction) {
	let dx = 0;
	let dy = 0;
	if (direction === LEFT) {
		dx = -1;
	}
	else if (direction === RIGHT) {
		dx = 1;
	}
	else if (direction === TOP) {
		dy = -1;
	}
	else if (direction === BOTTOM) {
		dy = 1;
	}
	return [dx, dy];
}

let snake_id = 0;

function set_data(x, y, direction) {
	// remove the cell from the free cells list
	data[y][x] |= direction;
	snakes[y][x] = snake_id;
	let index = free_cells.indexOf(free_cells.find(e => e[0] == y && e[1] == x));
	if (index > -1) {
		free_cells.splice(index, 1);
	}
}

function go_in_direction(x, y, direction) {
	let cnt = ceil(random(min(count_free_in_direction(x, y, direction), 10)));
	if (cnt < 1) {
		return [x, y];
	}
	let [dx, dy] = get_dx_dy(direction);

	// remove the cell from the free cells list
	set_data(x, y, direction);
	set_data(x + cnt * dx, y + cnt * dy, negate_direction(direction));

	while (cnt > 0) {
		cnt--;
		x += dx;
		y += dy;
		if (cnt == 0) {
			set_data(x, y, negate_direction(direction));
			break;
		}
		if (direction === LEFT || direction === RIGHT) {
			set_data(x, y, HORIZONTAL);
		}
		else if (direction === TOP || direction === BOTTOM) {
			set_data(x, y, VERTICAL);
		}
	}

	return [x, y];
}


function add_random_snake(start) {
	let y = start[0];
	let x = start[1];
	let direction = start[2];

	snake_id++;
	heads[snake_id] = [y, x, direction];

	if (data[y][x] && data[y][x] != 0) {
		return;
	}

	set_data(x, y, direction);
	[x, y] = go_in_direction(x, y, negate_direction(direction));
	if (random(1000) < 900) {
		direction = next_direction(direction);
		if (random(100) < 50) {
			direction = negate_direction(direction);
		}
		[x, y] = go_in_direction(x, y, direction);
	}
	if (random(1000) < 900) {
		direction = next_direction(direction);
		if (random(100) < 50) {
			direction = negate_direction(direction);
		}
		[x, y] = go_in_direction(x, y, direction);
	}
}

function preload() {
	m = floor(0.9 * windowWidth / size);
	n = floor(0.9 * windowHeight / size);
	for (let i = 0; i < n; i++) {
		data.push([]);
		snakes.push([]);
	}
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			free_cells.push([i, j]);
		}
	}
}

function setup() {
	// get the size of the screen
	canvas = createCanvas(m * size, n * size);
	canvas.parent("centered-canvas");
	canvasOffset = canvas.position();

	while (free_cells.length > 0) {
		// pick a random square
		let found = false;
		let cnt = 50;
		while (!found && cnt > 0) {
			cnt--;

			let [rand_y, rand_x] = free_cells[floor(random(free_cells.length))];
			if (data[rand_y][rand_x]) {
				continue;
			}
			// pick a random direction
			let rand_dir = floor(random(4));
			if (rand_dir === 0) {
				rand_dir = TOP;
			}
			else if (rand_dir === 1) {
				rand_dir = RIGHT;
			}
			else if (rand_dir === 2) {
				rand_dir = BOTTOM;
			}
			else if (rand_dir === 3) {
				rand_dir = LEFT;
			}

			// if all of the squares next to it in the chosen direction are occupied
			// then we CAN add a snake there

			x = rand_x;
			y = rand_y;

			let [dx, dy] = get_dx_dy(rand_dir);
			x += dx;
			y += dy;

			found = true;
			while (x < m && y < n && x >= 0 && y >= 0) {
				if (!data[y][x] || data[y][x] == 0) {
					found = false;
					break;
				}
				x += dx;
				y += dy;
			}

			if (found) {
				let random_edge = [rand_y, rand_x, rand_dir];
				add_random_snake(random_edge);
			}
		}
	}

}

function touchStarted() {
  handlePress();
  return false; // prevents scrolling / default behavior
}

function mousePressed() {
  handlePress();
}

function handlePress() {
  let x = floor(mouseX / size);
  let y = floor(mouseY / size);

  if (x < 0 || x >= m || y < 0 || y >= n) return;

  if (snakes[y][x]) {
    let head = heads[snakes[y][x]];
    let [dx, dy] = get_dx_dy(head[2]);

    let check_y = head[0];
    let check_x = head[1];

    check_x += dx;
    check_y += dy;

    while (check_x >= 0 && check_x < m && check_y >= 0 && check_y < n) {
      if (data[check_y][check_x] || data[check_y][check_x] != 0) {
        return;
      }
      check_x += dx;
      check_y += dy;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (snakes[i][j] == snakes[y][x]) {
        data[i][j] = 0;
      }
    }
  }
}

function draw() {
	background(220);

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			fill(255, 255, 255);
			rect(j * size, i * size, size, size);
		}
	}
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			fill(10, 10, 10);
			// no border
			noStroke();

			if (data[i][j] & TOP) {
				rect(j * size + size / 2 - size / 6, i * size, size / 3, size / 2 + size / 6);
			}
			if (data[i][j] & RIGHT) {
				rect((j + 1) * size - size / 2 - size / 6, i * size + size / 2 - size / 6, size / 2 + size / 6, size / 3);
			}
			if (data[i][j] & BOTTOM) {
				rect(j * size + size / 2 - size / 6, (i + 1) * size - size / 2 - size / 6, size / 3, size / 2 + size / 6);
			}
			if (data[i][j] & LEFT) {
				rect(j * size, i * size + size / 2 - size / 6, size / 2 + size / 6, size / 3);
			}
			let head = heads[snakes[i][j]];
			if (head[0] == i && head[1] == j && data[i][j] != 0) {
				fill(255, 0, 0);
				let head_direction = head[2];
				if (head_direction === TOP) {
					rect(j * size + size / 2 - size / 6, i * size, size / 3, size / 6);
				}
				else if (head_direction === RIGHT) {
					rect((j + 1) * size  - size / 6, i * size + size / 2 - size / 6, size / 6, size / 3);
				}
				else if (head_direction === BOTTOM) {
					rect(j * size + size / 2 - size / 6, (i + 1) * size - size / 6, size / 3, size / 6);
				}
				else if (head_direction === LEFT) {
					rect(j * size, i * size + size / 2 - size / 6, size / 6, size / 3);
				}
			}
		}
	}

}
