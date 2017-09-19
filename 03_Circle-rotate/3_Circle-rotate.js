var cx, cy; // center position of canvas
var radius;
var hourRadius, minuteRadius, secondRadius;

function setup() {
    createCanvas(640, 640);
    radius = Math.min(width, height) / 2;

    hourRadius = radius /3.5;
    minuteRadius = radius / 2.85;
    secondRadius = radius / 6.15;
    cx = width / 2;
    cy = height / 2;
}

function draw(){

    //dots on clock face
    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    var hourCenterX = cx + cos(h) * hourRadius;
    var hourCenterY = cy + sin(h) * hourRadius;

    var minuteCenterX = hourCenterX + cos(m) * minuteRadius;
    var minuteCenterY = hourCenterY + sin(m) * minuteRadius;

    var secondCenterX = minuteCenterX + cos(s) * secondRadius;
    var secondCenterY = minuteCenterY + sin(s) * secondRadius;

    stroke(0);
    strokeWeight(1);
    noFill();
    ellipse(cx,cy,width/1.2,width/1.2);

    // hour hand
    strokeWeight(2);
    fill(255);
    ellipse(hourCenterX, hourCenterY, 350);

    //minute hand
    fill(255);
    ellipse(minuteCenterX, minuteCenterY, 125);

    //second hand
    noStroke();
    fill(29,216,216);
    ellipse(secondCenterX, secondCenterY, 20);
}

