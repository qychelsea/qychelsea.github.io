var hourTen, hourDigit,minuteTen, minuteDigit,secondTen,secondDigit;

function setup() {
    createCanvas(640, 550);
}

function draw(){
    background(235);
    fill(100);
    textSize(30);
    textAlign(CENTER);
    text("- .... . / - .. -- . / -. --- .-- / .. ... ---...",width/2,100);
    hourTen = Math.floor(hour()/10);
    minuteTen = Math.floor(minute()/10);
    secondTen = Math.floor(second()/10);
    hourDigit = hour()%10;
    minuteDigit = minute()%10;
    secondDigit = second()%10;

    console.log(secondTen,secondDigit);

    var codeMorse = ["-----", ".----", "..---","...--","....-",".....","-....","--...","---..","----."];

    fill(75);
    textSize(100);
    textStyle(BOLD);
    text(codeMorse[hourTen],300,200);
    text(codeMorse[hourDigit],300,250);
    textStyle(NORMAL);
    text(codeMorse[minuteTen],300,300);
    text(codeMorse[minuteDigit],300,350);
    fill(150);
    text(codeMorse[secondTen],300,400);
    text(codeMorse[secondDigit],300,450);

}

