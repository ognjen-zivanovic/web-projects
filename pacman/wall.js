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
