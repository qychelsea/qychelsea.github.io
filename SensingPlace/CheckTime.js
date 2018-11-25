var keyCode;
var h,d,n;
var img,imgscrl;

function preload(){
    img=loadImage('images/IMG_7007.jpg');
    //img=loadImage('images/pythagoras.jpg');
    imgscrl=loadImage('images/scroll.png');
}

function setup() {
    //createCanvas(300,500);
    createCanvas(window.innerWidth, window.innerHeight);

}

function draw(){
    imageMode(CENTER);
    filter(GRAY);
    tint(227,44,16,126);
    image(img,width/2,height/2);

    fill(255);
    textAlign(LEFT);
    textSize(55);
    textFont('Helvetica');

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

    //text("Welcome to Kendall Square", width/2,height/2);
    if (n===0||n===6){
        text("Nocturnal actors", width/2,height/3);
        text("Changing with time", width/2,height/3+65);
        text("New Morning Awaits", width/2,height/3+130);
        text("What's Next?", width/2,height/3+190);
    }else if (h>=9&&h<18){
        text("Beacon of its time", width/2,height/3);
        text("I have plenty to offer", width/2,height/3+65);
        text("Remember me", width/2,height/3+130);
        text("More to come", width/2,height/3+190);
        text(weekday[n], width/2,40);
    }
    else {
        text("Unrestful nights", width/2,height/3);
        text("Empty shell", width/2,height/3+65);
        text("Outbound", width/2,height/3+130);
        text("Path unclear", width/2,height/3+190);
    }


    textSize(12);
    text(weekday[n], width/2,height/2+105);

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
    if (n===0||n===6){
        window.open("essay-night.html","_self");
    }else if (h>=9&&h<18){
        window.open("essay-day.html", "_self");
    }
    else {
        window.open("essay-night.html", "_self)")
    }
}

function keyPressed(){
    if (keyCode === UP_ARROW){
        if (n===0||n===6){
            //window.open("https://www.youraddress.com","_self")
            window.open("essay-night.html","_self");
        }else if (h>=9&&h<18){
            window.open("essay-day.html", "_self");
        }
        else {
            window.open("essay-night.html", "_self)")
        }

    }
}