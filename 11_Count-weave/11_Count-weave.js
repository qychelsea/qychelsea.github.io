var hourTen, hourDigit,minuteTen, minuteDigit,secondDigit;
var hourFive, minuteFive;
var g = 60;

function setup() {
    createCanvas(550, 550);
}

function draw(){
    background(235);
    fill(100);
    stroke(0);
    textSize(30);
    hourFive = 0;
    minuteFive = 0;

    hourTen = Math.floor(hour()/10);
    minuteTen = Math.floor(minute()/10);

    hourDigit = hour()%10;
    minuteDigit = minute()%10;
    secondDigit = second()%10;

    if (hourDigit>=5) {
        hourFive = 1;
        hourDigit = hourDigit-4;
    }
    if (minuteDigit>=5) {
        minuteFive = 1;
        minuteDigit = minuteDigit-4;
    }

    strokeWeight(3);

    for (i=0;i<minuteDigit;i++)//minute thin
        line(3*g+i*g, 2*g, 3*g+i*g, 8*g);
    push();
    if (secondDigit%2!==0) {//minute thin blinking
        stroke(235);
        i=i-1;
        line(3 * g + i * g, 2 * g, 3 * g + i * g, 8 * g);
    }
    pop();

    push();
    strokeWeight(10);
    for (i=0;i<minuteFive;i++)//minute Five
        line(3*g+i*g, 2*g, 3*g+i*g, 8*g);
        push();
        if (secondDigit%2!==0&&minute()%10===5) {//minute Five blinking
            stroke(235);
            i=i-1;
            line(3 * g + i * g, 2 * g, 3 * g + i * g, 8 * g);
        }
         pop();
    for (i=0;i<hourFive;i++)//hour Five
        line( 2*g,3*g+i*g, 8*g,3*g+i*g);
        push();
        if (secondDigit%2!==0&&hourDigit===5&&minute()===0) {//hour Five blinking
            stroke(235);
            i=i-1;
            line(3 * g + i * g, 2 * g, 3 * g + i * g, 8 * g);
        }
        pop();
    pop();

    for (i=0;i<hourDigit;i++)//hour thin
        line( 2*g,3*g+i*g, 8*g,3*g+i*g);
        push();
        if (secondDigit%2!==0&&minute()===0) {//hour thin blinking
            stroke(235);
            i=i-1;
            line(2*g,3*g+i*g, 8*g,3*g+i*g);
        }
        pop();

    push();
    noStroke();
    if (minute()>10) {
        for (i = 0; i < minuteTen; i++)//minute ten rectangle
            rect(3 * g + i * g - 10, g, 20, 20);
        push();
        if (secondDigit % 2 !== 0 && minute() % 10 === 0)//blink
            fill(235);
            i = i - 1;
            rect(3 * g + i * g - 10, g, 20, 20);
        pop();
    }
    if (hour()>10) {
        for (i = 0; i < hourTen; i++)//hour ten rectangle
            rect(g, 3 * g + i * g - 10, 20, 20);
        push();
        if (secondDigit % 2 !== 0 && hour() % 10 === 0 && minute() === 0)//blink
            fill(235);
            i = i - 1;
            rect(g, 3 * g + i * g - 10, 20, 20);
        pop();
    }
    pop();
}