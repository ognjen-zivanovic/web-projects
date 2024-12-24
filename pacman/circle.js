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