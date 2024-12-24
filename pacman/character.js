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
