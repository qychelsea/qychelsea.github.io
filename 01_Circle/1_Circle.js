var hourTen, hourDigit,minuteTen, minuteDigit,secondTen,secondDigit;

function setup() {
    createCanvas(640, 640);
}

function draw(){
    hourTen = Math.floor(hour()/10);
    minuteTen = Math.floor(minute()/10);
    secondTen = Math.floor(second()/10);
    hourDigit = hour()%10;
    minuteDigit = minute()%10;
    secondDigit = second()%10;
    background(255,130,175);
    console.log(hourTen, hourDigit,minuteTen, minuteDigit,secondTen,secondDigit);
    //text("Current time:\n\n:\n\n:\n\n" + hourTen,hourDigit,minuteTen,minuteDigit,secondTen,secondDigit,5, 50);
    fill(150);

}

