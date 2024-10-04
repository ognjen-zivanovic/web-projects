function createUI() {
	createRadioButton();

	slider1 = createSlider(10, 1000, 100);
	slider1.position(10, 30);
	slider1.size(100);
}

function createRadioButton() {
	myRadio = createRadio();
	myRadio.position(0, 0);
	myRadio.size(200);

	// Add a few color options.
	myRadio.option("node");
	myRadio.option("edge");

	myRadio.selected("node");
}
