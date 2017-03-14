/* @pjs preload="../../img/ame.png */

int timer = 0;
int rate = 1;
Float rotateCounter = 5;
boolean small = true;
boolean smallE = true;
boolean left = true;
String weather = "../../img/ame.png";

// Processing default function (1)
void setup() {
    size(window.screen.width, window.screen.height);
    background(0);
    fill(0);
    PFont fontA = loadFont("courier");
    textFont(fontA, 20);
    imageMode(CENTER);
}

// Processing default function (2)
void draw(){
    timer++;
    drawBackground();
    drawRainyPercentage();
    drawRainyImg();
}

void drawBackground() {
    background(0);
}

void drawRainyPercentage() {
    int rainPercentage = getShonandaiRainPercentage();
    fill(255, 255, 255);
    textSize(60);
    text("湘南台", 750, 300);
    text("降水確率: " + rainPercentage, 750, 400);
}

void drawRainyImg() {
    if (rotateCounter > 10) {
        rate = -1;
    }
    else if (rotateCounter < 0) {
        rate = 1;
    }
    rotateCounter = rotateCounter + rate;

    rotate(rate * PI/90);

    drawImage("../../img/ame.png", 350, 305, 738, 615);
}

void drawImage(String imgPath, x, y) {
    PImage img = loadImage(imgPath);
    image(img, x, y);
}

void drawImage(String imgPath, x, y, w, h) {
    PImage img = loadImage(imgPath);
    image(img, x, y, w, h);
}

