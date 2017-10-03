// Sketch for using the darksky API
// https://darksky.net/dev/docs
// This sketch requires you to start a local server or run it on a server
// See more about how to do that here:
// https://github.com/processing/p5.js/wiki/Local-server
var queryResult;
var img = [];
var textSizeLarge = 90;
var textSizeSmall = 30;
var textSizeNote = textSizeLarge/3;
var textColour = 95, lineColour = 190, backgroundColour = 255;
var gap = 20;
var rectLength;

function setup() {
    createCanvas(640,1136);
    background(backgroundColour);
    query();
    rectLength = (width - 4 * gap) / 3;
}

function query() {
    var url = 'https://api.darksky.net/forecast/e1da4ae08ea5f7bb0c60853d974b98b0/42.361936, -71.097309';
    loadJSON(url, gotData, 'jsonp');
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

}

function gotData(data) {
    console.log(data);
    queryResult = data;

    var currentWeather = queryResult.currently;

    imageMode(CENTER);

    image(img[currentWeather.icon], width / 2, 225, img.width, img.height);
    fill(textColour);
    textStyle(BOLD);
    textSize(textSizeSmall);
    textAlign(CENTER);
    text("C A M B R I D G E", width / 2, 450);

    drawCurrently();
}

function clearBottom() {
    fill(backgroundColour);
    noStroke();
    rect(0, 470, width, height - 470);

    stroke(lineColour);
    line(gap, 475, width - gap, 475);
    line(gap, 565, width - gap, 565);

    fill(245);
    noStroke();

    for (var i = 0; i<=2; i++){
        rect((i+1)*gap+i*rectLength,485,rectLength,70);
    }

    fill(190);
    textSize(textSizeSmall);
    textAlign(CENTER);
    textStyle(NORMAL);
    text("currently",gap+rectLength/2,525);
    text("hourly",gap*2+rectLength*1.5,525);
    text("daily",gap*3+rectLength*2.5,525);

}
function mousePressed(){
    if (mouseX>gap&&mouseX<rectLength+gap&&mouseY>485&&mouseY<485+70){
        drawCurrently();}
    if (mouseX>gap*2+rectLength&&mouseX<2*(rectLength+gap)&&mouseY>485&&mouseY<485+70){
        drawHourly();}
    if (mouseX>gap*3+2*rectLength&&mouseX<3*(rectLength+gap)&&mouseY>485&&mouseY<485+70){
        drawDaily();}
//    if (mouseX>gap&&mouseX<)
}

function drawCurrently(){
    clearBottom();
    var currentWeather = queryResult.currently;
    var xPos = 20;
    var yPos = 670;
    var yGap = 125;
    var yNotePos = yPos - 35;

    fill(245);
    for (var i=0;i<=3;i++){
        rect(gap,585+i*125,width-2*gap, 100);
    }
    fill(textColour);
    textSize(textSizeSmall);
    textStyle(NORMAL);
    text("currently",gap+rectLength/2,525);

    textAlign(LEFT);
    textSize(textSizeLarge);
    textStyle(BOLD);
    text(Math.round(currentWeather.temperature), 30, yPos);
    textSize(textSizeNote);
    text("ºF",width/3.5,yNotePos);
    text("Temperature",width/3.5,yNotePos+35);
    yPos += yGap;
    yNotePos = yPos -35;

    textSize(textSizeLarge);
    text(currentWeather.precipProbability*100, 30, yPos);
    textSize(textSizeNote);
    text("%",width/3.5,yNotePos);
    text("Chance of Rain", width/3.5, yNotePos+35);
    yPos += yGap;
    yNotePos = yPos -35;

    textSize(textSizeLarge);
    text(Math.round(currentWeather.windSpeed), 30, yPos);
    textSize(textSizeNote);
    text("mph",width/3.5,yNotePos);
    text("Wind Speed", width/3.5,yNotePos+35);
    yPos += yGap;
    yNotePos = yPos -35;

    textSize(textSizeLarge);
    text(currentWeather.humidity*100, 30, yPos);
    textSize(textSizeNote);
    text("%",width/3.5,yNotePos);
    text("Humidity", width/3.5,yNotePos+35);
    yPos += yGap;
    yNotePos = yPos -35;
}

function drawDaily() {
    clearBottom();
    var dailyWeather = queryResult.daily.data;
    console.log(dailyWeather);
    var yPos = 650;
    var yGap = 70;

    fill(textColour);
    textSize(textSizeSmall);
    textStyle(NORMAL);

    text("daily",gap*3+rectLength*2.5,525);

    for (var i = 1; i <= 7; i++) {
        textAlign(LEFT);
        textSize(textSizeSmall);
        textStyle(BOLD);
        fill(textColour);

        text("day  " + i, 30, yPos);
        image(img[dailyWeather[i].icon], width / 2, yPos - 10, 50, 37);

        textAlign(RIGHT);
        text(Math.round(dailyWeather[i].temperatureHigh), width - 100, yPos);

        textStyle(NORMAL);
        text(Math.round(dailyWeather[i].temperatureLow), width - 30, yPos);

        yPos += yGap;
    }
}

function drawHourly(){
    clearBottom();
    var hourlyWeather = queryResult.hourly.data;
    console.log(hourlyWeather);
    var yPos = 650;
    var yGap = 70;
    var h = hour();
    var hTrack = hour();
    var apm = "am";

    fill(textColour);
    textSize(textSizeSmall);
    textAlign(CENTER);
    textStyle(NORMAL);
    text("hourly",gap*2+rectLength*1.5,525);


    if (hour()>=12){
        apm = "pm";
        if (hour()>12) {
            h = hour() - 12;
        }
    }

    for (var i = 1;i<=7;i++){
        textAlign(LEFT);
        textSize(textSizeSmall);
        textStyle(BOLD);
        fill(textColour);
        if(hTrack>23) {
            if (hTrack===24){
                h=12;
            }else {
                h = hTrack - 24;
            }
            apm = "am";
        }
        text(h + " " + apm, 30, yPos);
        textAlign(RIGHT);
        text(Math.round(hourlyWeather[hTrack].temperature), width-40, yPos);

        image(img[hourlyWeather[hTrack].icon], width/2, yPos-10, 50,37);

        yPos += yGap;
        hTrack++;
        h++;
    }
}