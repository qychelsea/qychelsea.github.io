var hourTen, hourDigit,minuteTen, minuteDigit,secondTen,secondDigit;
var img = [];
var gap, xPos;

function preload(){
    for (var i=0;i<10;i++){
        img [i] = loadImage('Images/Braille_Numbers-'+ i + '.png');
    }
}

function setup() {
    createCanvas(825, 200);
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

    image(img[hourTen], 100, height / 2.3, img.width, img.height);
    image(img[hourDigit], 200, height / 2.3, img.width, img.height);
    image(img[minuteTen], 340, height / 2.3, img.width, img.height);
    image(img[minuteDigit], 440, height / 2.3, img.width, img.height);
    image(img[secondTen], 580, height / 2.3, img.width, img.height);
    image(img[secondDigit], 680, height / 2.3, img.width, img.height);
}

