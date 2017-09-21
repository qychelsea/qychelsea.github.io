var hourTen, hourDigit,minuteTen, minuteDigit,secondTen, secondDigit;
var rectWidth=60, rectHeight=30; //width and height of rectangles
var hGap = rectWidth*1.3, vGap = rectHeight*1.3; //horizontal and vertical gap
var lGap = 10; //extra spacing for horizontal line
var i;

function setup() {
    createCanvas(680, 450);
}

function draw(){
    translate(100,100);
    background(235);
    fill(100);
    stroke(1);
    strokeWeight(2);
    line(0,vGap,6*hGap,vGap);
    noStroke();

    hourTen = Math.floor(hour()/10);
    minuteTen = Math.floor(minute()/10);
    secondTen = Math.floor(second()/10);

    hourDigit = hour()%10;
    minuteDigit = minute()%10;
    secondDigit = second()%10;

   //seconds
    fill(210);
    if (secondDigit>=5) {
        rect(hGap*5, 0, rectWidth,rectHeight);
        secondDigit = secondDigit-5;
    }
    for (i=0;i<secondDigit;i++)
        rect(hGap*5, (i+1)*vGap+lGap, rectWidth,rectHeight);

    if (secondTen===5) {
        rect(hGap * 4, 0, rectWidth, rectHeight);
    }else{
        for (i=0;i<secondTen;i++)
            rect(hGap*4, (i+1)*vGap+lGap, rectWidth,rectHeight);
    }

    //minutes
    fill(145);
    if (minuteDigit>=5) {
        rect(hGap*3, 0, rectWidth,rectHeight);
        minuteDigit = minuteDigit-5;
    }
    for (i=0;i<minuteDigit;i++)
        rect(hGap*3, (i+1)*vGap+lGap, rectWidth,rectHeight);

    if (minuteTen===5) {
        rect(hGap * 2, 0, rectWidth, rectHeight);
    }else{
        for (i=0;i<minuteTen;i++)
            rect(hGap*2, (i+1)*vGap+lGap, rectWidth,rectHeight);
    }

    //hour
    fill(100);
    if (hourDigit>=5) {
        rect(hGap, 0, rectWidth,rectHeight);
        hourDigit = hourDigit-5;
    }
    for (i=0;i<hourDigit;i++)
        rect(hGap, (i+1)*vGap+lGap, rectWidth,rectHeight);

    for (i=0;i<hourTen;i++)
        rect(0, (i+1)*vGap+lGap, rectWidth,rectHeight);

    push();
        fill(100);
        strokeWeight(1);
        textSize(30);
        textAlign(RIGHT);
        text("a b a c u s",width-225,275);
        text("c l o c k",width-225,300);
    pop();
}