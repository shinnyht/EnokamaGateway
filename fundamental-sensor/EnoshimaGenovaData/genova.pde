/* @pjs preload="../../img/map.png, ../../img/sunny.png, ../../img/cloudy.png, ../../img/rainy.png, ../../img/enone.png, ../../img/enonex.png, ../../img/wave.png, ../../img/bubble.png, ../../img/weatherbubble.png, ../../img/bubble3.png, ../../img/genova.png */

int timer = 0;
boolean small = true;
boolean smallE = true;
boolean textType = true;
boolean weather1 = true;
boolean left = true;
String yashi = "../../img/genova.png";
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
	drawGenova();
	drawBubble();
	drawText();
}

void drawBackground() {
	background(0);
}

void drawGenova() {
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
	drawImage(x, 500, 50, 650, 450);
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
    text("Enoshima", 700, 170);
    text("Genova", 920, 170);
    textSize(30);
    text("Weather", 550, 220);
    textSize(25);
    text("Temperature", 550, 290);
    textSize(30);
    text("Humidity", 550, 360);
    text("Wind Speed", 550, 430);
    textSize(30);
    text(getEnoshimaWeather(), 710, 220);
    text(getGenovaWeather(), 930, 220);
    textSize(40);
    text(getEnoshimaTemp() + "℃", 750, 290);
    text(getGenovaTemp() + "℃", 970, 290);
    text(getEnoshimaHumi() + "％", 750, 360);
    text(getGenovaHumi() + "％", 970, 360);
    text(getEnoshimaWind() + "m/s", 750, 430);
	text(getGenovaWind() + "m/s", 970, 430);
 }

//Not used
void drawTextQ(){
	fill(0, 0, 0);
	textSize(55);
	text("今日の", 600, 150);
	text("江の島とgenovaの", 600, 220);
	text("似ている度は？", 600, 290);
}
//Not Used
void drawTextA(){
	float luigi = getEnoshimaGenova();
	String word = getEnoshimaGenovaWord();
	String word2 = getEnoshimaGenovaWord2();
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
	text("「似ている度」は江の島とgenovaの本日の天候", 600, 340);
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
