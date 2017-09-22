var cx, cy; // center position of canvas
var radius;
var deltaX, deltaY;
var x1,y1, x2, y2; //x1,y1 for hour, x2, y2 for minute

function setup() {

    createCanvas(640, 640);
    radius = Math.min(width, height) / 3;
    cx = width / 2;
    cy = height / 2;
}

function draw(){
    //dots on clock face
    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    noStroke();
    fill(255);
    rect(0,0,width,height);
    if (hour()<12){
        strokeWeight(1);
        fill(240);
        ellipse(cx,cy,width/1.475,width/1.475);
    }else{
        noStroke();
        fill(150);
        ellipse(cx,cy,width/1.475,width/1.475);
    }

    stroke(0);
    strokeWeight(3);

    x1 = cx + cos(h) * radius;
    y1 = cy + sin(h) * radius;
    x2 = cx + cos(m) * radius;
    y2 =  cy + sin(m) * radius;
    line (x2, y2, x1, y1);

    deltaX = x2-x1;
    deltaY = y2-y1;

    fill(144,125,235);
    noStroke();
    ellipse(x1+deltaX/60*second(), y1+deltaY/60*second(), 10,10);
}