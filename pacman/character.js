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
		// rotate image bases on moving direction
		//set angle based on direction, the image by default is facing left
		this.angle = 0;
		switch (this.direction) {
			case "LEFT":
				this.angle = 0;
				break;
			case "RIGHT":
				this.angle = 180;
				break;
			case "UP":
				this.angle = 90;
				break;
			case "DOWN":
				this.angle = 270;
				break;
		}

		push();
		// fix the image position
		translate(draw_x + this.w / 2, draw_y + this.h / 2);
		rotate(radians(this.angle));
		imageMode(CENTER);
		image(this.img, 0, 0, constants.size, constants.size);
		pop();

		// draw image normally
		//image(this.img, draw_x, draw_y, constants.size, constants.size);
	}
}
