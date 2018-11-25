var keyCode;
var h,d,n;
var img;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw(){
    d = new Date();
    n = d.getDay();
    h = hour();

    if (n===0||n===6){
        window.open("essay-night-cover.html","_self");
    }else if (h>=9&&h<=18){
        window.open("essay-day-cover.html", "_self");
    }
    else {
        window.open("essay-night-cover.html","_self");
    }
}
