
var block_size = 40;

var n = 10, m = 10;

var map = [];

var index = -1;

var indexi = [];
var tren_k = -1;

function setup() {
	createCanvas(400, 600);
	
	for (var i = 0; i < n; i++) {
		map[i] = []
		for  (var j = 0; j < m; j++) {
			map[i][j] = -1;
		}
	}
	
	indexi = [null, null, null]
}

var blocks = [
			// l
			[['X', ' ', ' '], ['X', 'X', 'X']],
			[['X', 'X'], ['X', ' '], ['X', ' ']],
			[['X', 'X', 'X'], [' ', ' ', 'X']],
			[[' ', 'X'], [' ', 'X'], ['X', 'X']],

			[[' ', ' ', 'X'], ['X', 'X', 'X']],
			[['X', ' '], ['X', ' '], ['X', 'X']],
			[['X', 'X', 'X'], ['X', ' ', ' ']],
			[['X', 'X'], [' ', 'X'], [' ', 'X']],

			// kocka
			[['X', 'X'], ['X', 'X']],
			[['X', 'X', 'X'], ['X', 'X', 'X'], ['X', 'X', 'X']],

			// z
			[['X', 'X', ' '], [' ', 'X', 'X']],
			[[' ', 'X'], ['X', 'X'], ['X', ' ']],


			[[' ', 'X', 'X'], ['X', 'X', ' ']],
			[['X', ' '], ['X', 'X'], [' ', 'X']],

			// onaj plus
			[[' ', 'X', ' '], ['X', 'X', 'X']],
			[['X', 'X', 'X'], [' ', 'X', ' ']],
			[[' ', 'X'], ['X', 'X'], [' ', 'X']],
			[['X', ' '], ['X', 'X'], ['X', ' ']],

			// veliko l
			[['X', 'X', 'X'], ['X', ' ', ' '], ['X', ' ', ' ']],
			[['X', ' ', ' '], ['X', ' ', ' '], ['X', 'X', 'X']],
			[['X', 'X', 'X'], [' ', ' ', 'X'], [' ', ' ', 'X']],
			[[' ', ' ', 'X'], [' ', ' ', 'X'], ['X', 'X', 'X']],
			// malo l
			[['X', ' '], ['X', 'X']],
			[[' ', 'X'], ['X', 'X']],
			[['X', 'X'], ['X', ' ']],
			[['X', 'X'], [' ', 'X']],
			
			// i uspravno i vodoravno
			[['X', 'X', 'X', 'X']],
			[['X', 'X', 'X']],
			[['X', 'X']],
			
			[['X'], ['X'], ['X'], ['X']],
			[['X'], ['X'], ['X']],
			[['X'], ['X']],
		];
		
class Block {
	constructor(i) {
		this.bi = i;

		this.block = blocks[this.bi];
		this.bn = this.block.length;
		this.bm = this.block[0].length;

		this.c = int(random() * 7);
	}

	can_place(px, py) {	
		for (var i = 0; i < this.bn; i++) {
			for (var j = 0; j < this.bm; j++) {
				if (this.block[i][j] == 'X') {
					if (py + i >= n || px + j >= m || py + i < 0 || px + j < 0) return false;
					if (map[py + i][px + j] != -1) return false;
				}
			}
		}
		return true;
	}
	//var py = int(mouseY / block_size);
	//var px = int(mouseX / block_size);

	place_block(px, py) { 
		if (!this.can_place(px, py)) return false;

		for (var i = 0; i < this.bn; i++) {
			for (var j = 0; j < this.bm; j++) {
				if (this.block[i][j] == 'X') {
					map[py + i][px + j] = this.c;
				}
			}
		}
	
		//index = int(random() * blocks.length);
		
		//index++;
		//index %= blocks.length;
		return true;
	}

	show_hover(px, py) {
		for (var i = 0; i < this.bn; i++) {
			for (var j = 0; j < this.bm; j++) {
				if (py + i >= n || px + j >= m || py + i < 0 || px + j < 0) return false;
				if (this.block[i][j] == 'X') {
					//map[py + i][px + j] = true;
					this.draw(px * block_size, py * block_size, 1, 10);	
				}
			}
		}
	}

	check_mouse_click(offsetX, offsetY, scale, k) {
		var scaledBlockSize = scale * block_size;
		if (mouseX > offsetX &&
			mouseX < offsetX + scaledBlockSize * this.bm &&
			mouseY > offsetY &&
			mouseY < offsetY + scaledBlockSize * this.bn
		) {
			if (mouseIsPressed) {
				if (curr_block == null) {
					curr_block = this; 
					tren_k = k;
				}
			}
		}
	}

	draw(offsetX, offsetY, scale, ali = 255) {	
		for (var i = 0; i < this.bn; i++) {
			for (var j = 0; j < this.bm; j++) {
				if (i >= n || j >= m) continue;
				if (this.block[i][j] == 'X') {
					//map[py + i][px + j] = true;
					var scaledBlockSize = scale * block_size;
					push();

					var clr = getFillColor(this.c);
					clr.setAlpha(ali);
					fill(clr);
					
					rect(offsetX + j * scaledBlockSize, 
						 offsetY + i * scaledBlockSize, 
						 scaledBlockSize, 
						 scaledBlockSize);

					pop();
				}
			}
		}
	}

	can_place_anywhere() {
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < m; j++) {
				if (this.can_place(j, i)) {
					return true;
				}
			}
		}
		return false;
	}
}



function mouseReleased() {
	var py = int(my / block_size);
	var px = int(mx / block_size);

	var placed = false;
	if (curr_block != null) placed = curr_block.place_block(px, py);
	curr_block = null;
	mx = -1;
	my = -1;
	sx = -1;
	sy = -1;
	if (!placed) return;
	if (tren_k != -1) {
		indexi[tren_k] = null;
		tren_k = -1;
	}
}


function getFillColor(c) {
	if (c == 0) return color('#1600EA');
	if (c == 1) return color('#F99E2C');
	if (c == 2) return color('#EFF03E');
	if (c == 3) return color('#FF0019');
	if (c == 4) return color('#00F337');
	if (c == 5) return color('#AD00EB');
	if (c == 6) return color('#00F3EF');
	else return color(100);
}

function draw_map() {
	for (var i = 0; i < n; i++) {
		for  (var j = 0; j < m; j++) {
			if (map[i][j] != -1) {
				push();

				var c = map[i][j];

				fill(getFillColor(c));
				rect(j * block_size, i * block_size, block_size, block_size);

				pop();
			}
		}
 	}
}


function delete_full() { //todo
	let to_delete = [];
	for (var i = 0; i < n; i++) {
		to_delete[i] = [];
		for  (var j = 0; j < m; j++) {
			to_delete[i][j] = false;
		}
	}

	for (var i = 0; i < n; i++) {
		var cnt = 0;
		for  (var j = 0; j < m; j++) {
			if (map[i][j] != -1) cnt++;
		}
		if (cnt == m) {
			for  (var j = 0; j < m; j++) {
				to_delete[i][j] = true;
			}
		}
	}

	for  (var j = 0; j < m; j++) {
		var cnt = 0;
		for (var i = 0; i < n; i++) {
			if (map[i][j] != -1) cnt++;
		}
		if (cnt == n) {
			for (var i = 0; i < n; i++) {
				to_delete[i][j] = true;
			}
		}
	}

	for (var i = 0; i < n; i++) {
		for  (var j = 0; j < m; j++) {
			if (to_delete[i][j]) {
				map[i][j] = -1;
			}
		}
	}

}

var mx = -1, my = -1;

function mouseDragged(event) {
	if (mx == -1 || my == -1) [mx, my] = [event.x, event.y]
	mx += 2 * event.movementX;
	my += 2 * event.movementY;
	console.log(event);

	if (mx < 0) mx = 0;
	if (my < 0) my = 0;
}

var sx = -1, sy = -1;

function touchMoved(event) {
	if (sx == -1 || sy == -1) // [mx, my] = event.touche
   	{
		sx = event.touches[0].clientX;
		sy = event.touches[0].clientY;
   	}
	mx = (event.touches[0].clientX - sx) * 2 + sx;
	my = (event.touches[0].clientY - sy) * 2 + sy;
}

var curr_block = null;

function draw() {
	//console.log(indexi);
	
	if (indexi[0] == null && indexi[1] == null && indexi[2] == null) {
		var dzungla = 0;
		while(dzungla < 100) {
			indexi = [
				new Block(int(random() * blocks.length)),
				new Block(int(random() * blocks.length)),
				new Block(int(random() * blocks.length)),
			]
			for (var k = 0; k < 3; k++) {
				if (indexi[k].can_place_anywhere()) {
					dzungla = 1000;
					break;
				}
			}
			dzungla++;
		}
		console.log(dzungla);
	}
	

	background(220);

	draw_map();

	//console.log(mx, my);
	if (mx != -1 && my != -1) {
		var py = int(my / block_size);
		var px = int(mx / block_size);

		if(curr_block != null) curr_block.show_hover(px, py);
	}
	for (var k = 0; k < 3; k++) {
		if(indexi[k] == null) continue;
		//console.log(indexi[k]);
		var offsetX = block_size + k * block_size * 3;
		var offsetY = (n + 2) * block_size;

		indexi[k].check_mouse_click(offsetX, offsetY, 0.5, k);
		indexi[k].draw(offsetX, offsetY, 0.5);
	}

	line(0, n * block_size, m * block_size, n*block_size);

	delete_full();
}
