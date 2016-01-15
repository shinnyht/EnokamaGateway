/* @pjs preload="../../img/propeller.png, ../../img/stand.png", ../../img/wind.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean left = true;
String[] weather = ["../../img/sunny.png", "../../img/cloudy.png", "../../img/rainy.png"];

// Processing default function (1)
void setup() {
	size(window.screen.width, window.screen.height);
	background(0);
	fill(0);
	PFont fontA = loadFont("courier");
	textFont(fontA, 20);  
}

// Processing default function (2)
void draw(){
	timer++;
	drawBackground();
	drawWind();
	drawWindSpeed();
	drawWindImg();
}

void drawBackground() {
	background(0);
}

void drawWind() {
	// meters per hour x 10 is good?
	int windSpeed = float(getEnoshimaWindSpeed());	

	drawImage("../../img/stand.png", 0, 0, 386, 500);
	pushMatrix();
	translate(193, 250);
	rotate(radians(map(timer, 1, 30, 0, windSpeed * 10)));
	imageMode(CENTER);
	drawImage("../../img/propeller.png", 0, 0, 386, 500);
	imageMode(CORNER);
	translate(-450, -300);
	popMatrix();
}

void drawWindSpeed() {
	int windSpeed = getEnoshimaWindSpeed();
	fill(255, 255, 255);
	textSize(60);
	text("湘南台", 400, 100);
	text("風速: " + windSpeed + " km/s", 400, 200);
}

void drawWindImg() {
	if (timer % 50 == 0) {
		if (small) {
			small = false;
		} else {
			small = true;	
		}
	}

	if (small) {
		drawImage("../../img/wind.png", 400, 270, 350, 200);
	} else {
		drawImage("../../img/wind.png", 380, 250, 390, 240);
	}
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}


