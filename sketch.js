var blocks;
var c, w, cols, rows;
var aliSlider, cohSlider, sepSlider;

function setup() {
	var canvas = createCanvas(700, 500);
	canvas.parent('canvas');

	c = random(360);
	w = 20;
	cols = width / w;
	rows = height / w;

	sepSlider = createSlider(0, 5, 1.2, 0.1).parent('separation');
	aliSlider = createSlider(0, 5, 1, 0.1).parent('alignment');
	cohSlider = createSlider(0, 5, 2, 0.1).parent('cohesion');

	blocks = new Array(rows);
	for (var i = 0; i < cols; i++) {
		blocks[i] = new Array(cols);
	}

	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			blocks[y][x] = new Block(x * w, y * w, w);
		}
	}
}

function draw() {
	background(255);

	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var west = null;
			var east = null;
			var north = null;
			var south = null;
			if (x > 0) west = blocks[y][x - 1];
			if (x < cols - 1) east = blocks[y][x + 1];
			if (y > 0) north = blocks[y - 1][x];
			if (y < rows - 1) south = blocks[y + 1][x];

			// corners
			var northwest = null;
			var northeast = null;
			var southwest = null;
			var southeast = null;
			if ((x > 0) && (y > 0)) northwest = blocks[y - 1][x - 1];
			if ((x < cols - 1) && (y > 0)) northeast = blocks[y - 1][x + 1];
			if ((y < rows - 1) && (x > 0)) southwest = blocks[y + 1][x - 1];
			if ((y < rows - 1) && (x < cols - 1)) southeast = blocks[y + 1][x + 1];

			var b = [west, east, north, south, northwest, northeast, southwest, southeast];
			blocks[y][x].flock(b);

			blocks[y][x].display();
			blocks[y][x].update();
		}
	}

	// fill(0, 0, 255);
	// noStroke();
	// rect(250, 400, 25, 25);
}

function mouseClicked() {
	console.log("set color");
	if (mouseX < width && mouseX > 0) {
		if (mouseY < height && mouseY > 0) {
			var pixel = get(mouseX, mouseY);
			for (y = 0; y < rows; y++) {
				for (x = 0; x < cols; x++) {
					blocks[y][x].setToColor(pixel[0], pixel[1], pixel[2]);
				}
			}
		}
	}
}

function keyPressed() {
	if (key == 'r' || key == 'R') {
		console.log("reset");
		for (y = 0; y < rows; y++) {
			for (x = 0; x < cols; x++) {
				blocks[y][x].randomizeColor();
			}
		}
	}
}