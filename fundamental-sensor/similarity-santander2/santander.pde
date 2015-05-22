/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png, ../../img/bubble3.png, ../../img/santander.png, ../../img/enoshima.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean textType = true;
boolean weather1 = true;
boolean left = true;
String enoshi = "../../img/enoshima.png";
String yashi = "../../img/santander.png";
String bubble = "../../img/bubble3.png";

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
	drawSantander();
	drawBubble();
	drawText();
}

void drawBackground() {
	background(0);
}

void drawSantander() {
	if (timer % 20 == 0) {
		if (small) {
			small = false;
		} else {
			small = true;	
		}
	}

	String w = yashi;
	String x = enoshi;
	drawImage(x, 0, 0, 400, 400);
	if (small) {
		drawImage(w, 150, 250, 400, 400);
	} else {
		drawImage(w, 150, 260, 400, 400);
	}
}

void drawBubble(){
	x = bubble;
	drawImage(x, 550, 50, 600, 450);
}

void drawText(){
	if(timer%100 == 0){
		if(textType){
			textType = false;
		}else{
			textType = true;
		}
	}
	if(textType){
		drawTextQ();
	}else{
		drawTextA();
	}
	drawNote();
}


// takamasa edit
void drawTextQ(){
	fill(0, 0, 0);
	textSize(40);
	text("Today\'s Enoshima and", 600, 150);
	text("Santander\'s Similarity", 600, 220);
	text("is...", 600, 290);
}

void drawTextA(){
	float luigi = getEnoshimaSantander();
	String word = getEnoshimaSantanderWord();
	String word2 = getEnoshimaSantanderWord2();
	String word3 = getEnoshimaSantanderWord3();
	fill(255, 0, 0);
	textSize(70);
	text(luigi + "％", 600, 160);
	fill(0, 0, 0);
	textSize(35);
	text(word, 590, 240);
	text(word2, 590, 300);
	text(word3, 590, 360);
}


// takamasa edit
void drawNote(){
	fill(0, 0, 0);
	textSize(18);
	text("Similarity is calculated by today\'s Enoshima and", 600, 400);
	text("Santander's Weather condition(Weather, Temperature", 600, 430);
	text("Humidity and Wind Speed).", 600, 460);
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}
