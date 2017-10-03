var queryResult;
var yoff = 0.0;
var button = 1;
function setup() {
    createCanvas(640, 1136);
    background(190);
    query();
}

function query() {
    var url= 'https://api.darksky.net/forecast/436fdc35bab87ffdf2f6cf130fc5ddc5/42.361936, -71.097309';
//e1da4ae08ea5f7bb0c60853d974b98b0
    loadJSON(url, gotData, 'jsonp');
}


function gotData(data) {
    console.log(data);
    queryResult = data;

    var currentWeather = queryResult.currently;

    var xPos = 20;
    var yPos = 40;
    var yGap = 60;
    var textSizeLarge = 40;
    var textSizeSmall = 14;

    // List relevant items of information
    fill(255);
    textStyle(BOLD);

    // The location is not live data, just entered manually
    textSize(textSizeSmall);
    text("Location",20, yPos);
    yPos+=textSizeLarge;
    textSize(textSizeLarge);
    text("Cambridge",20, yPos);
    yPos+=yGap;

    textSize(textSizeSmall);
    text("Weather",20, yPos);
    yPos+=textSizeLarge;
    textSize(textSizeLarge);
    text(currentWeather.summary,20, yPos);
    yPos+=yGap;

    drawCurrent();
}
function drawCurrent(){

    var c1,c2,cr,cg,cb;//c1 cloud cover; c2 temperature

    var currentWeather = queryResult.currently;
    c1 = 255-Math.round(map(currentWeather.cloudCover,0,1,0,255));
    c1 = color(c1,c1,c1);

    c2 = currentWeather.temperature;
    //c2 = map (c2,0,110,0,1);
    if (c2<66){cr=0;}
    if (c2>=66&&c2<=80){cr=138;}
    if (c2>80){cr=255;}

    if (c2<40){cg=0;}
    if (c2>=40&&c2<=54){cg=138;}
    if (c2>54){cg=255;}

    if (c2<58){cb=0;}
    if (c2>=58&&c2<=66){cb=138;}
    if (c2>66){cb=255;}

    c2 = color(cr,cg,cb);

    console.log(c1);
    console.log(c2);

    setGradient(c1, c2);

    setNoise();

}
function setGradient(c1, c2) {
    noFill();
    for (var i = 0; i <= height; i++) {
        var inter = map(i,0,height,0,1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(0, i, 0 + width, i);
    }
}
function mousePressed(){
    button = 0;
}
function setNoise(){
    var currentWeather = queryResult.currently;
    background(51);
    fill(255);
    // We are going to draw a polygon out of the wave points

    beginShape();
    var xoff = 0;

    // Iterate over horizontal pixels
    for (var x = 0; x <= width; x += 10) {
        // Calculate a y value according to noise, map to

        var y = map(noise(xoff, yoff), 0, 1, 200,300);

        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xoff += 0.05;
    }
    // increment y dimension for noise
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);


}