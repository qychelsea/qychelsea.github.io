var keyCode;
var h = hour();
var d = new Date();
var n = d.getUTCDay();
var weekday = new Array();

function setup() {
    //createCanvas(800,500);
    createCanvas(window.innerWidth, window.innerHeight);
}
function draw(){
    background(10);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    //text(weekday[n],10,10);
    //text("hour="+h,10,30);
    fill(255);
    text("Please press up", width/2,height/2);
}

function keyPressed(){
    if (keyCode === UP_ARROW){
        if (n!==0&&n!==6&&h<9&&h<18){
            //window.open("https://www.youraddress.com","_self")
            window.open("essay-day.html","_self");
        }else{
            window.open("essay-night.html","_self");
        }
    }
}