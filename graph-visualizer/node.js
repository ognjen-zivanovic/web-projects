class Node {
	constructor(x, y, i) {
		this.x = x;
		this.y = y;
		this.r = 50;
		this.i = i;
	}

	draw() {
		fill(255, 0, 0);
		if (this == node1) {
			fill(0, 255, 0);
		}
		noStroke();
		circle(this.x * scale + camera_x, this.y * scale + camera_y, this.r * scale);
	}

	is_clicked(x, y) {
		let dx = x - this.x;
		let dy = y - this.y;

		let d = dx * dx + dy * dy;
		if (d < this.r * this.r) {
			return true;
		} else {
			return false;
		}
	}
}

function addNode(x, y) {
	var new_node = new Node(x, y, n);
	arr[n] = new_node;
	g[n] = [];
	d[n] = [];
	for (let j = 0; j < n; ++j) {
		d[n][j] = 10000000;
		d[j][n] = 10000000;
	}
	d[n][n] = 0;
	n++;
}
