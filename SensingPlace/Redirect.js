var keyCode;
var h,d,n;
var img,imgscrl;

function preload(){
    //img=loadImage('images/IMG_7007.jpg');
    //img=loadImage('images/pythagoras.jpg');
    //imgscrl=loadImage('images/scroll.png');
}

function setup() {
    //createCanvas(300,500);
    createCanvas(window.innerWidth, window.innerHeight);

}

function draw(){
    /*imageMode(CENTER);
    filter(GRAY);
    tint(227,44,16,126);
    image(img,width/2,height/2);

    fill(255);
    textAlign(LEFT);
    textSize(55);
    textFont('Helvetica');
    text("Redirecting", width/2,height/2);

    textSize(12);*/

    var weekday = new Array();
    d = new Date();
    n = d.getDay();
    h = hour();
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    //text("n="+n, width/2,height/2+20);
    //text(weekday[n], width/2,height/2+40);
    //text("d="+d, width/2,height/2+60);
    //text("h="+h, width/2,height/2+80);
    if (n===0||n===6){
        window.open("essay-night-cover.html","_self");
    }else if (h>=9&&h<=18){
        window.open("essay-day-cover.html", "_self");
    }
    else {
        window.open("essay-night-cover.html","_self");
    }
}
