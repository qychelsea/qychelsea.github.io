var keyCode;
var h,d,n,s;
var img,imgscrl;
var txtsize, gap;

function preload(){
    img=loadImage('images/IMG_7007.jpg');
    //img=loadImage('images/pythagoras.jpg');
    imgscrl=loadImage('images/scroll.png');
}

function setup() {
    //createCanvas(300,500);


}

function draw() {
    createCanvas(window.innerWidth, window.innerHeight);
    imageMode(CENTER);

    tint(142, 135, 117, 126);
    //tint(227, 44, 16, 126);
    image(img, width / 2, height / 2);
    filter(GRAY);

    fill(255);
    textAlign(LEFT);

    textFont('Helvetica');

    var weekday = new Array();
    d = new Date();
    n = d.getDay();
    h = hour();
    s = second();
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    txtsize = height / 17;
    if (txtsize > 22) {
        textSize(22);
    }

    text(weekday[n], width/2,height/5);

    txtsize=height/17;
    textSize(txtsize);
    gap=txtsize+7;
    //text("Welcome to Kendall Square", width/2,height/2);
    if (s<30){
        text("Clashing of eras", width/2,height/5+gap+50);
        text("The heavy hand", width/2,height/5+2*gap+50);
        text("Missing words", width/2,height/5+3*gap+50);
        text("Weighing on", width/2,height/5+4*gap+50);
    }else{
        text("Beacon of its time", width/2,height/5+gap+50);
        text("I have plenty to offer", width/2,height/5+2*gap+50);
        text("Remember me", width/2,height/5+3*gap+50);
        text("More to come", width/2,height/5+4*gap+50);
    }


    textSize(12);
    text("scroll up to see Kendall", width/2,height/5+6*gap+45);



    push();
    //filter(INVERT);
    textAlign(CENTER);
    tint(255,255,255,85);
    imageMode(LEFT);
    image(imgscrl,width/2+imgscrl.width/2,height/2+215);
    pop();


    //text("n="+n, width/2,height/2+20);
    //text(weekday[n], width/2,height/2+40);
    //text("d="+d, width/2,height/2+60);
    //text("h="+h, width/2,height/2+80);
}

function mouseWheel(){
    window.open("essay-day.html","_self");
}

function keyPressed(){
    window.open("essay-day.html","_self");

}