function makeDraggablePanel(panel, excludeElements = [], padding = 0) {
	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;
	let panelBounds;

	function getTouchCoords(touch) {
		panelBounds = panel.elt.getBoundingClientRect();
		return {
			x: touch.clientX - panelBounds.left,
			y: touch.clientY - panelBounds.top,
			absX: touch.clientX,
			absY: touch.clientY,
		};
	}

	function isPointerOverExcludedElements(x, y) {
		return excludeElements.some((el) => {
			const rect = el.elt.getBoundingClientRect();
			panelBounds = panel.elt.getBoundingClientRect();
			return (
				(x >= rect.left - padding &&
					x <= rect.right + padding &&
					y >= rect.top - padding &&
					y <= rect.bottom + padding) ||
				!(
					x >= panelBounds.left &&
					x <= panelBounds.right &&
					y >= panelBounds.top &&
					y <= panelBounds.bottom
				)
			);
		});
	}

	// Mouse events
	function mousePressedHandler() {
		if (!isPointerOverExcludedElements(mouseX, mouseY)) {
			isDragging = true;
			offsetX = mouseX - panel.position().x;
			offsetY = mouseY - panel.position().y;
			return true;
		}
		return false;
	}

	function mouseReleasedHandler() {
		if (isDragging) {
			isDragging = false;
			return true;
		}
		return false;
	}

	function mouseDraggedHandler() {
		if (isDragging) {
			panel.position(mouseX - offsetX, mouseY - offsetY);
			return true;
		}
		return false;
	}

	// Touch events
	function touchStartHandler(e) {
		const touch = e.touches[0];
		const coords = getTouchCoords(touch);

		if (!isPointerOverExcludedElements(coords.absX, coords.absY)) {
			isDragging = true;
			offsetX = coords.absX - panel.position().x;
			offsetY = coords.absY - panel.position().y;
			return true;
		}
		return false;
	}

	function touchMoveHandler(e) {
		if (isDragging) {
			const touch = e.touches[0];
			const x = touch.clientX - offsetX;
			const y = touch.clientY - offsetY;
			panel.position(x, y);
			return true;
		}
		return false;
	}

	function touchEndHandler() {
		if (isDragging) {
			isDragging = false;
			return true;
		}
		return false;
	}

	// Attach mouse handlers to panel
	panel._customMousePressed = mousePressedHandler;
	panel._customMouseReleased = mouseReleasedHandler;
	panel._customMouseDragged = mouseDraggedHandler;

	// Attach touch handlers directly to panel DOM element
	panel.elt.addEventListener("touchstart", touchStartHandler, { passive: false });
	panel.elt.addEventListener("touchmove", touchMoveHandler, { passive: false });
	panel.elt.addEventListener("touchend", touchEndHandler);

	// Only attach global mouse event hooks once
	if (!window._draggablePanels) {
		window._draggablePanels = [];

		let oldPressed = typeof mousePressed !== "undefined" ? mousePressed : function () {};
		let oldReleased = typeof mouseReleased !== "undefined" ? mouseReleased : function () {};
		let oldDragged = typeof mouseDragged !== "undefined" ? mouseDragged : function () {};

		window.mousePressed = function (event) {
			for (p of window._draggablePanels) {
				if (p._customMousePressed()) {
					return;
				}
			}

			oldPressed(event);
		};

		window.mouseReleased = function (event) {
			for (p of window._draggablePanels) {
				if (p._customMouseReleased()) {
					return;
				}
			}
			oldReleased(event);
		};

		window.mouseDragged = function (event) {
			for (p of window._draggablePanels) {
				if (p._customMouseDragged()) {
					return;
				}
			}
			oldDragged(event);
		};
	}

	window._draggablePanels.push(panel);
}
