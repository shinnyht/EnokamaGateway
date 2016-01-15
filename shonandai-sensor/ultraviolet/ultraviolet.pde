/* @pjs preload="../../img/ultraviolet-yellow-flame.png, ../../img/ultraviolet-yellow-face.png, ../../img/ultraviolet-yelloworange-flame.png, ../../img/ultraviolet-yelloworange-face.png, ../../img/ultraviolet-orange-flame.png, ../../img/ultraviolet-orange-face.png, ../../img/ultraviolet-orangered-flame.png, ../../img/ultraviolet-orangered-face.png, ../../img/ultraviolet-red-flame.png, ../../img/ultraviolet-red-face.png" */

int timer = 0;
String[] strength = ["弱い", "やや強い", "強い", "非常に強い", "極めて強い"];
String[] strengthColor = ["yellow", "yelloworange", "orange", "orangered", "red"];
String[] strengthWord = ["肌へのダメージは小さい", "日焼けが起きやすい", "腫れやかゆみが生じることも", "腫れに加え、痛みが生じることも", ""];

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
	drawSun();
	drawUltravioletValue();
	// drawWindImg();
}

void drawBackground() {
	background(0);
}

void drawSun() {
	// meters per hour x 10 is good?

	drawImage("../../img/ultraviolet-" + strengthColor[getUltravioletStrength()] + "-face.png", 130, 130, 350, 350);
	pushMatrix();
	translate(305, 305);
	rotate(radians(map(timer, 1, 30, 0, 30)));
	imageMode(CENTER);
	drawImage("../../img/ultraviolet-" + strengthColor[getUltravioletStrength()] + "-flame.png", 0, 0, 610, 610);
	imageMode(CORNER);
	translate(-305, -305);
	popMatrix();
}

void drawUltravioletValue() {
	fill(255, 255, 255);
	textSize(60);
	text("湘南台 今日の紫外線", 630, 200);
	text("", 630, 250);
	text("紫外線が" + strength[getUltravioletStrength()] + "です", 630, 350);
	text(strengthWord[getUltravioletStrength()] + "でしょう", 630, 450);
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}


