var hourTen, hourDigit,minuteTen, minuteDigit,secondTen,secondDigit;
var border = 20;
var k;

function setup() {
    createCanvas(640, 640);
}

function draw() {
    background(235);
    noFill();
    stroke(150);

    var row1 = border + height / 3;
    var row2 = border + 2 * height / 3;
    var row3 = height - border;
    var col1 = border;
    var col2 = border + width / 3;
    var col3 = border + 2 * width / 3;

    for (k = 0; k <= width; k += (width - 2 * border) / 6) {
        line(border + k, border, border + k, height - border);
    }
    for (k = 0; k <= height; k += (height - 2 * border) / 6) {
        line(border, border + k, height - border, border + k);
    }
    hourTen = Math.floor(hour() / 10);
    minuteTen = Math.floor(minute() / 10);
    secondTen = Math.floor(second() / 10);
    hourDigit = hour() % 10;
    minuteDigit = minute() % 10;
    secondDigit = second() % 10;


    textSize(350);
    //hour
    var h = hour();
    if (h > 12) {
        h = h - 12;
    }
    if (h >= 5 && h <= 12) {//hour9
        fill(255, 0, 0);
        text("+", col1, row1);
    }
    if (h === 2 || h === 3 || h === 4 || h === 11 || h === 12) {//hour3
        text("+", col2, row1);
    }
    if (h === 5 || h === 6 || h === 7) {
        text("-", col2, row1);
    }
    if (h % 3 === 1) {//hour1
        text("+", col3, row1);
    }
    if (h % 3 === 2) {
        text("-", col3, row1);
    }
    //minuteTen
    if (minuteTen === 5) {
        text("+", col1, row2);
        text("-", col2, row2);
        text("-", col3, row2);
    } else if (minuteTen !== 1) {
        text("+", col2, row2);
    }
    if (minuteTen % 3 === 1) {
        text("+", col3, row2);
    }
    if (minuteTen === 2) {
        text("-", col3, row2);
    }
//minuteDigit
    if (minuteDigit >= 5) {//second
        fill(255, 0, 0);
        text("+", col1, row3);
    }
    if (minuteDigit === 2 || minuteDigit === 3 || minuteDigit === 4) {//second 3
        text("+", col2, row3);
    }
    if (minuteDigit === 5 || minuteDigit === 6 || minuteDigit === 7) {
        text("-", col2, row3);
    }

    if (minuteDigit % 3 === 1) {//second1
        text("+", col3, row3);
    }
    if (minuteDigit % 3 === 2) {
        text("-", col3, row3);
    }
}

