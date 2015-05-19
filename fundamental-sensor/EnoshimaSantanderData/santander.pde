/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png, ../../img/bubble3.png, ../../img/santander.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean textType = true;
boolean weather1 = true;
boolean left = true;
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
	if (small) {
		drawImage(w, 0, 0, 500, 500);
	} else {
		drawImage(w, 0, 10, 500, 500);
	}
}

void drawBubble(){
	x = bubble;
	drawImage(x, 550, 50, 500, 450);
}

void drawText(){
	if(timer%100 == 0){
		if(textType){
			textType = false;
		}else{
			textType = true;
		}
	}
	//if(textType){
	//	drawTextQ();
	//}else{
	//	drawTextA();
	//}
	drawTextData();
	//drawNote();
}

// takamasa edit
void drawTextData(){
	fill(0, 0, 0);
	textSize(40);
	text("江の島", 680, 170);
	text("santander", 850, 170);
	text("天気", 600, 220);
	text("気温", 600, 290);
	text("湿度", 600, 360);
	text("風速", 600, 430);
	text(getEnoshimaWeather(), 700, 220);
	text(getSantanderWeather(), 870, 220);
	text(getEnoshimaTemp() + "℃", 700, 290);
	text(getSantanderTemp() + "℃", 870, 290);
	text(getEnoshimaHumi() + "％", 700, 360);
	text(getSantanderHumi() + "％", 870, 360);
	text(getEnoshimaWind() + "m/s", 700, 430);
	text(getSantanderWind() + "m/s", 870, 430);
}
//Not used
void drawTextQ(){
	fill(0, 0, 0);
	textSize(55);
	text("今日の", 600, 150);
	text("江の島とsantanderの", 600, 220);
	text("似ている度は？", 600, 290);
}
//Not Used
void drawTextA(){
	float luigi = getEnoshimaSantander();
	String word = getEnoshimaSantanderWord();
	String word2 = getEnoshimaSantanderWord2();
	fill(255, 0, 0);
	textSize(70);
	text(luigi + "％", 600, 160);
	fill(0, 0, 0);
	textSize(45);
	text(word, 590, 240);
	text(word2, 590, 300);
}
//Not Used
void drawNote(){
	fill(0, 0, 0);
	textSize(20);
	text("「似ている度」は江の島とsantanderの本日の天候", 600, 340);
	text("（天気、気温、湿度、風速）をもとに算出して", 600, 370);
	text("おります", 600, 400);
}

void drawImage(String imgPath, x, y) {
	PImage img = loadImage(imgPath);
	image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
	PImage img = loadImage(imgPath);
	image(img, x, y, w, h);
}
