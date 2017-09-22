var cx, cy; // center position of canvas
var radius;

function setup() {
    createCanvas(640, 640);
    radius = Math.min(width, height) / 2.65;
    cx = width / 2;
    cy = height / 2;
}

function draw(){

    //dots on clock face
    var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    stroke(0);
    strokeWeight(1);
    fill(255);
    ellipse(cx,cy,width/1.2,width/1.2);

    //minute hand
    push();
    noStroke();
    fill(100);
    translate(width/2,height/2);
    rotate(-.5*PI);
    arc(0, 0, 500, 500, 0, m+0.5*PI,PIE);

    fill(255);
    arc(0, 0, 350, 350, 0, m+0.5*PI,PIE);
    pop();

    //second hand
    push();
    noStroke();
    fill(175);
    translate(width/2,height/2);
    rotate(-.5*PI);
    arc(0, 0, 325, 325, 0, s+0.5*PI, PIE);

    fill(255);
    arc(0, 0, 175, 175, 0, s+0.5*PI, PIE);
    pop();


    // hour hand
    if (hour()<12){
        stroke(237,43,111);
    }else{
        stroke(43,189,237);
    }
    strokeWeight(6);
    line(cx, cy, cx + cos(h) * radius, cy + sin(h) * radius);

}

