var keyCode;
var h = hour();



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
    var d = new Date();
    var n = d.getUTCDay();
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    text("n="+n, width/2,height/2+20);
    text(weekday[n], width/2,height/2+40);
    //text("hour="+h,10,30);

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