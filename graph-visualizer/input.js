function findClickedNode() {
	for (let i = 0; i < n; i++) {
		if (arr[i].is_clicked((mouseX - camera_x) / scale, (mouseY - camera_y) / scale)) {
			clicked_node = arr[i];
		}
	}
}

function mousePressed() {
	//test.draw();

	findClickedNode();
}

let panning = false;

let isTouching = false;
let lastTouchX = 0;
let lastTouchY = 0;

function handleDrag(event) {
	if (clicked_node) {
		let posX = event.clientX || (event.changedTouches ? event.changedTouches[0].clientX : 0);
		let posY = event.clientY || (event.changedTouches ? event.changedTouches[0].clientY : 0);
		clicked_node.x = (posX - camera_x) / scale;
		clicked_node.y = (posY - camera_y) / scale;
	} else {
		let dX =
			event.movementX ||
			(event.changedTouches ? event.changedTouches[0].clientX - lastTouchX : 0);
		let dY =
			event.movementY ||
			(event.changedTouches ? event.changedTouches[0].clientY - lastTouchY : 0);
		camera_x += dX;
		camera_y += dY;
		panning = true;
	}
	lastTouchX = event.clientX || (event.changedTouches ? event.changedTouches[0].clientX : 0);
	lastTouchY = event.clientY || (event.changedTouches ? event.changedTouches[0].clientY : 0);
}

function mouseDragged(event) {
	if (event.touches || event.buttons == 1) {
		handleDrag(event);
	}
}

function touchStarted(event) {
	findClickedNode();
	isTouching = true;
	lastTouchX = event.touches[0].clientX;
	lastTouchY = event.touches[0].clientY;
}

function touchMove(event) {
	if (isTouching) {
		handleDrag(event);
		event.preventDefault(); // Prevent default scroll behavior
	}
}

function touchEnd(event) {
	isTouching = false;
}

function mouseReleased() {
	if (panning) {
		panning = false;
		return;
	}
	if (!clicked_node && radioValue == "edge") {
		node1 = null;
		node2 = null;
	}

	if (clicked_node && radioValue == "edge") {
		if (!node1) node1 = clicked_node;
		else if (!node2) {
			node2 = clicked_node;

			addEdge(node1.i, node2.i, true);
		}
	}
	if (!clicked_node && radioValue == "node") {
		addNode((mouseX - camera_x) / scale, (mouseY - camera_y) / scale);
	}
	clicked_node = null;
}

function mouseWheel(event) {
	scrollDelta = event.delta;
	mouseX = event.clientX;
	mouseY = event.clientY;
	if (scrollDelta < 0) {
		scale *= 0.9;
		if (scale < 0.1) {
			scale = 0.1;
		} else {
			camera_x = 0.1 * mouseX + 0.9 * camera_x;
			camera_y = 0.1 * mouseY + 0.9 * camera_y;
		}
	} else {
		scale *= 1.1;
		if (scale > 5) {
			scale = 5;
		} else {
			camera_x = -0.1 * mouseX + 1.1 * camera_x;
			camera_y = -0.1 * mouseY + 1.1 * camera_y;
		}
	}
}
