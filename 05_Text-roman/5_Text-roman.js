var hourTen, hourDigit,minuteTen, minuteDigit,secondTen,secondDigit;

function setup() {
    createCanvas(640, 640);
}

function draw(){
    background(235);
    fill(100);
    textSize(30);
    textAlign(LEFT);
    hourTen = Math.floor(hour()/10);
    minuteTen = Math.floor(minute()/10);
    secondTen = Math.floor(second()/10);
    hourDigit = hour()%10;
    minuteDigit = minute()%10;
    secondDigit = second()%10;

    console.log(secondTen,secondDigit);

    var codeMorse = [" ", "I", "II","III","IV","V","VI","VII","VIII","IX"];

    fill(75);
    textSize(100);
    textStyle(BOLD);
    text(codeMorse[hourTen],250,175);
    text(codeMorse[hourDigit],250,247);
    text(codeMorse[minuteTen],250,319);
    text(codeMorse[minuteDigit],250,391);
    fill(150);
    text(codeMorse[secondTen],250,463);
    text(codeMorse[secondDigit],250,535);

}

