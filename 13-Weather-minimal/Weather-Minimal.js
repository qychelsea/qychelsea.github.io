// Sketch for using the darksky API
// https://darksky.net/dev/docs
// This sketch requires you to start a local server or run it on a server
// See more about how to do that here:
// https://github.com/processing/p5.js/wiki/Local-server

var queryResult;
var img = [];

function setup() {
    createCanvas(640,1136);
    background(255);
    query();
}

function query() {
    var url = 'https://api.darksky.net/forecast/436fdc35bab87ffdf2f6cf130fc5ddc5/42.361936, -71.097309';
    loadJSON(url, gotData, 'jsonp');
    //e1da4ae08ea5f7bb0c60853d974b98b0
}
function preload(){
    img['rain'] = loadImage('images/rain.png');
    img['partly-cloudy-night'] = loadImage('images/partly-cloudy-night.png');
    img['partly-cloudy-day'] = loadImage('images/partly-cloudy-day.png');
    img['fog'] = loadImage('images/fog.png');
    img['clear-day'] = loadImage('images/clear-day.png');
    img['clear-night'] = loadImage('images/clear-night.png');
    img['cloudy'] = loadImage('images/cloudy.png');
    img['hail'] = loadImage('images/hail.png');
    img['sleet'] = loadImage('images/sleet.png');
    img['snow'] = loadImage('images/snow.png');
    img['thunderstorm'] = loadImage('images/thunderstorm.png');
    img['tornado'] = loadImage('images/tornado.png');
    img['wind'] = loadImage('images/wind.png');

 /*   for (var i=0;i<=12;i++){
        img [i] = loadImage('images/'+ i + '.png');
    }*/
}

function gotData(data) {
    console.log(data);
    queryResult = data;

    var currentWeather = queryResult.currently;

    var xPos = 20;
    var yPos = 670;
    var yGap = 150;
    var textSizeLarge = 95;
    var textSizeSmall = 30;
    var gap = 20;
    var rectLength = (width - 4*gap) / 3;
    var textColour = 95, lineColour = 190;

    imageMode(CENTER);

    image(img[currentWeather.icon], width/2, 225, img.width/2.5, img.height/2.5);
    fill(textColour);
    textStyle(BOLD);
    textSize(textSizeSmall);
    textAlign(CENTER);
    text("C A M B R I D G E",width/2 ,450);

    stroke(lineColour);
    line(gap,475,width-gap,475);
    line(gap,565,width-gap,565);

    fill(230);
    noStroke();
    for (var i = 0; i<=2; i++){
        rect((i+1)*gap+i*rectLength,485,rectLength,70);
    }

    fill(textColour);
    textSize(textSizeSmall);
    textStyle(NORMAL);
    text("currently",gap+rectLength/2,525);
    text("hourly",gap*2+rectLength*1.5,525);
    text("daily",gap*3+rectLength*2.5,525);

    textAlign(LEFT);
    textSize(textSizeLarge);
    textStyle(BOLD);
    text(Math.round(currentWeather.temperature) + "ºF", 30, yPos);
    yPos += yGap;

    text(Math.round(currentWeather.precipProbability)*100 + "%", 30, yPos);
    yPos += yGap;

    text(Math.round(currentWeather.windSpeed) + "mph", 30, yPos);
    yPos += yGap;
/*

    text(Math.floor(currentWeather.) + "mph", 30, yPos);
    yPos += yGap;
*/

    /*    textSize(textSizeSmall);
        text("Weather", 20, yPos);
        yPos += textSizeLarge;
        textSize(textSizeLarge);
        text(currentWeather.summary, 20, yPos);
        yPos += yGap;



        textSize(textSizeSmall);
        text("Precipitation", 20, yPos);
        yPos += textSizeLarge;
        textSize(textSizeLarge);
        text(currentWeather.precipIntensity + "%", 20, yPos);
        yPos += yGap;

        textSize(textSizeSmall);
        text("Humidity", 20, yPos);
        yPos += textSizeLarge;
        textSize(textSizeLarge);
        text(currentWeather.humidity + "%", 20, yPos);
        yPos += yGap;*/
}