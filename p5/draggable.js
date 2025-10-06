function makeDraggablePanel(panel, excludeElements = [], padding = 0) {
	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;

	// Internal mouse handlers for this panel
	function mousePressedHandler() {
		if (!excludeElements.some((el) => isMouseOverElement(el, padding))) {
			isDragging = true;
			offsetX = mouseX - panel.position().x;
			offsetY = mouseY - panel.position().y;
		}
	}

	function mouseReleasedHandler() {
		isDragging = false;
	}

	function mouseDraggedHandler() {
		if (isDragging) {
			panel.position(mouseX - offsetX, mouseY - offsetY);
		}
	}

	// Attach custom handlers to the panel
	panel._customMousePressed = mousePressedHandler;
	panel._customMouseReleased = mouseReleasedHandler;
	panel._customMouseDragged = mouseDraggedHandler;

	// Only attach global event hooks once
	if (!window._draggablePanels) {
		window._draggablePanels = [];

		let oldPressed = typeof mousePressed !== "undefined" ? mousePressed : function () {};
		let oldReleased = typeof mouseReleased !== "undefined" ? mouseReleased : function () {};
		let oldDragged = typeof mouseDragged !== "undefined" ? mouseDragged : function () {};

		window.mousePressed = function () {
			oldPressed();
			window._draggablePanels.forEach((p) => p._customMousePressed());
		};

		window.mouseReleased = function () {
			oldReleased();
			window._draggablePanels.forEach((p) => p._customMouseReleased());
		};

		window.mouseDragged = function () {
			oldDragged();
			window._draggablePanels.forEach((p) => p._customMouseDragged());
		};
	}

	window._draggablePanels.push(panel);
}

// Utility: Check if mouse is over an HTML element
function isMouseOverElement(el, padding) {
	let rect = el.elt.getBoundingClientRect();
	return (
		mouseX >= rect.left - padding &&
		mouseX <= rect.right + padding &&
		mouseY >= rect.top - padding &&
		mouseY <= rect.bottom + padding
	);
}
