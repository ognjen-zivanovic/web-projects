function createUI() {
	let controlPanel = createDiv();
	controlPanel.position(0, 0, "absolute");

	let controls = createDiv();
	controls.class("controls");

	edgeLenText = createP("Edge length");
	edgeLenText.class("label");

	edgeLenSlider = createSlider(10, 1000, 100);
	edgeLenSlider.class("slider");

	radioButtonsContainer = createDiv();
	radioButtonsContainer.style("display", "flex");
	radioButtonsContainer.style("flex-direction", "row");
	radioButtonsContainer.style("gap", "1rem");

	nodeButton = createButton("Node");
	nodeButton.class("button");
	nodeButton.mousePressed(function () {
		if (radioValue == "node") {
			radioValue = "";
			nodeButton.style("background-color", "");
		} else {
			radioValue = "node";
			nodeButton.style("background-color", "#aaa");
			edgeButton.style("background-color", "");
		}
	});

	edgeButton = createButton("Edge");
	edgeButton.class("button");
	edgeButton.mousePressed(function () {
		if (radioValue == "edge") {
			radioValue = "";
			edgeButton.style("background-color", "");
		} else {
			radioValue = "edge";
			edgeButton.style("background-color", "#aaa");
			nodeButton.style("background-color", "");
		}
	});

	radioButtonsContainer.child(nodeButton);
	radioButtonsContainer.child(edgeButton);

	controls.child(edgeLenText);
	controls.child(edgeLenSlider);
	controls.child(radioButtonsContainer);

	controlPanel.child(controls);
	makeDraggablePanel(controlPanel, [edgeLenSlider], 2);
}
