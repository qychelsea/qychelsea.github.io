var hourTen, hourDigit,minuteTen, minuteDigit,secondTen,secondDigit;
var img = [];
var gap, xPos;

function preload(){
    for (var i=0;i<10;i++){
        img [i] = loadImage('Image/Chinese_Numbers-'+ i + '.png');
    }
}

function setup() {
    createCanvas(500, 500);
    background(235);
}

function draw() {

    background(235);

    hourTen = Math.floor(hour() / 10);
    minuteTen = Math.floor(minute() / 10);
    secondTen = Math.floor(second() / 10);
    hourDigit = hour() % 10;
    minuteDigit = minute() % 10;
    secondDigit = second() % 10;

    imageMode(CENTER);

    tint(255, 255);
    image(img[hourTen], 100, height / 2.3, img.width, img.height);
    image(img[hourDigit], 200, height / 2.3, img.width, img.height);
    image(img[minuteTen], 275, height / 3, 50, 50);
    image(img[minuteDigit], 325, height / 2.75,50, 50);
    tint(255, 128);
    image(img[secondTen], 275, height / 1.5, 50, 50);
    image(img[secondDigit], 325, height / 1.5, 50, 50);
}

