var keyCode;
var h,d,n;


function setup() {
    //createCanvas(300,500);
    createCanvas(window.innerWidth, window.innerHeight);
}
function draw(){
    background(10);
    fill(255);
    textAlign(CENTER);
    text("press up to exit station", width/2,height/2);
    var weekday = new Array();
    d = new Date();
    n = d.getUTCDay();
    h = hour();
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    text("n="+n, width/2,height/2+20);
    text(weekday[n], width/2,height/2+40);
    text("d="+d, width/2,height/2+60);
    text("h="+h, width/2,height/2+80);
    //text("hour="+h,10,30);

}

function keyPressed(){
    if (keyCode === UP_ARROW){
        text("it gets here",width/2,height/2+60);
        if (n===0||n===6){
            //window.open("https://www.youraddress.com","_self")
            window.open("essay-night.html","_self");
        }else if (h>9&&h<18){
            window.open("essay-day.html", "_self");
        }
        else {
            window.open("essay-night.html", "_self)")
        }

    }
}