var cx, cy; // center position of canvas
var radius;
var clockDiameter;

function setup() {
    createCanvas(640, 640);
    radius = Math.min(width, height) / 3;
    clockDiameter = radius * 1.8;
    cx = width / 2;
    cy = height / 2;
}

function draw(){
    //dots on clock face
    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    if (hour()<12){
        strokeWeight(1);
        fill(255);
        ellipse(cx,cy,width/1.475,width/1.475);
    }else{
        noStroke();
        fill(240);
        ellipse(cx,cy,width/1.475,width/1.475);
    }
    // second hand
    stroke(120);
    strokeWeight(3);
    line(cx + cos(m) * radius, cy + sin(m) * radius, cx + cos(s) * radius, cy + sin(s) * radius);
    // minute hand
    stroke(220);
    strokeWeight(2);
    line(cx + cos(s) * radius, cy + sin(s) * radius, cx + cos(h) * radius, cy + sin(h) * radius);
    // hour hand
    stroke(0);
    strokeWeight(4);
    line(cx + cos(h) * radius, cy + sin(h) * radius, cx + cos(m) * radius, cy + sin(m) * radius);
}