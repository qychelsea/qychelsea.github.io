var keyCode;
var h,d,n;
var img;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    d = new Date();
    n = d.getDay();
    h = hour();

    if (h>=9&&h<=18){
        window.open("essay-day-cover.html","_self");
    }else {
        window.open("essay-night-cover.html", "_self");
    }

}