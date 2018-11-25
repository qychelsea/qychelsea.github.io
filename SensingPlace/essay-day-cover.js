var keyCode;
var h,d,n,s;
var img,imgscrl;
var txtsize, gap;

function preload(){
    img=loadImage('images/IMG_7007.jpg');
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
    if (s<30) {
        text("Building the most", width / 2, height / 5 + gap + 50);
        text("innovative square mile", width / 2, height / 5 + 2 * gap + 50);
        text("on Earth", width / 2, height / 5 + 3 * gap + 50);
        push();
        textSize(18);
        text("-Bill Harris, Perkins+Will", width / 2, height / 5 + 4 * gap + 50);
        pop();
    }else {
        text("A formidable challenge", width/2,height/5+gap+50);
        text("for the whiz kids of Kendall,", width/2,height/5+2*gap+50);
        text("who helped build the Internet", width/2,height/5+3*gap+50);
        text("and sequence genomes:", width/2,height/5+4*gap+50);
        text("how to get to work", width/2,height/5+5*gap+50);
        push();
        textSize(18);
        text("-Robert Weisman on congestion at KSQ, Boston Globe", width / 2, height / 5 + 6 * gap + 50);
        pop();
    }


    textSize(12);
    text("scroll to see Kendall", width/2,height/5+7*gap+45);



    push();
    //filter(INVERT);
    textAlign(CENTER);
    tint(255,255,255,85);
    imageMode(LEFT);
    image(imgscrl,width/2+40,height/5+7*gap+105, 55,80);
    pop();


    //text("n="+n, width/2,height/2+20);
    //text(weekday[n], width/2,height/2+40);
    //text("d="+d, width/2,height/2+60);
    //text("h="+h, width/2,height/2+80);
}

function mouseWheel(){
    window.open("essay-day.html","_self");
}

function mousePressed(){
    window.open("essay-day.html","_self");
}
function keyPressed(){
    window.open("essay-day.html","_self");

}