var queryResult;
var yoff = 0.0;

var textSizeLarge = 35;
var textSizeSmall = 25;
var screenNum =0;

var currentWeather, hourlyWeather, dailyWeather;
var backgroundColour = 190;

function setup() {
    createCanvas(640, 1136);
    background(backgroundColour);
    query();
}

function query() {
    var url= 'https://api.darksky.net/forecast/e1da4ae08ea5f7bb0c60853d974b98b0/42.361936, -71.097309';
//e1da4ae08ea5f7bb0c60853d974b98b0//436fdc35bab87ffdf2f6cf130fc5ddc5
    loadJSON(url, gotData, 'jsonp');
}


function gotData(data) {
    console.log(data);
    queryResult = data;

    currentWeather = queryResult.currently;
    hourlyWeather = queryResult.hourly.data;
    dailyWeather = queryResult.daily.data;

    drawHome();
}

function drawHome(){
    screenNum = 0;
    var yPos = 350;
    var yGap = 150;
    background(backgroundColour);

    fill(230);
    textStyle(ITALIC);
    textAlign(CENTER);
    stroke(230);
    strokeWeight(2);
    line(175,360,460,360);
    noStroke();

    var xPos = width/2;

    textSize(textSizeLarge*.8);
    text("please make a request",xPos,yPos);
    yPos = yPos + 100;

    fill(125);
    textSize(textSizeLarge);
    textStyle(BOLD);
    text("Currently",xPos, yPos);
    yPos+=yGap;
    text("Hourly",xPos, yPos);
    yPos+=yGap;
   // text("Daily",xPos, yPos);


}
function mousePressed(){
    if (screenNum===0){
        if (mouseY>425&&mouseY<515){drawCurrent();}
        if (mouseY>575&&mouseY<665){drawHour();}
        //if (mouseY>725&&mouseY<815){drawDay();}
    }
    if (screenNum===1){
        if (mouseX>30&&mouseX<80&&mouseY>30&&mouseY<80){
            drawHome();}
        if (mouseX>30&&mouseX<80&&mouseY>100&&mouseY<140){//legend
            drawLegend1();}
        }
    if (screenNum===2){
        if (mouseX>30&&mouseX<80&&mouseY>30&&mouseY<80){
            drawHome();}
        if (mouseX>30&&mouseX<80&&mouseY>100&&mouseY<140){//legend
            drawLegend2();}
        }
/*    if (screenNum===3){
        if (mouseX>30&&mouseX<80&&mouseY>100&&mouseY<140){//legend
            drawLegend3();}
        }*/
    if (screenNum===4){
        if (mouseX>575&&mouseX<615&&mouseY>30&&mouseY<100){//close legend2
            drawCurrent();}
        }
    if (screenNum===5){
        if (mouseX>575&&mouseX<615&&mouseY>30&&mouseY<100){//close legend3
            drawHour();}
        }
}

function drawLegend1() {
    screenNum = 4;
    var inter, c;
    var c1 = color(255);
    var c2 = color(0);

    background(190, 190, 190, 190);
    line(575, 30, 615, 70);
    line(615, 30, 575, 70);

    textSize(textSizeSmall);
    noStroke();
    fill(235);
    textAlign(CENTER);
    text("cloud cover", width / 2, 150);
    text("temperature", width / 2, height - 200);
    text("length: wind speed", width / 2, height / 2);
    text("direction; wind bearing", width / 2, height / 2 + 50);

    for (i = width / 3; i <= width / 3 * 2; i++) {
        inter = map(i, width/3, width/3*2, 0, 1);
        c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, 175, i, 225);
    }
    noStroke();
    text("0%", width / 3, 275);
    text("100%", width / 3 * 2, 275);


    var c5 = color(255, 127, 0);
    var c4 = color(127, 255, 0);
    var c3 = color(0, 255, 127);
    c2 = color(0, 127, 255);
    c1 = color(0, 0, 255);

    for (i = width / 3; i <= width / 3 + width / 12; i++) {
        inter = map(i, width / 3, width / 3 + width / 12, 0, 1);
        c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    for (i = width / 3 + width / 12; i <= width / 3 + width / 6; i++) {
        inter = map(i, width / 3 + width / 12, width / 3 + width / 6, 0, 1);
        c = lerpColor(c2, c3, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    for (i = width / 3 + width / 6; i <= width / 3 + width / 4; i++) {
        inter = map(i, width / 3 + width / 6, width / 3 + width / 4, 0, 1);
        c = lerpColor(c3, c4, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    for (i = width / 3 + width / 4; i <= width / 3 * 2; i++) {
        inter = map(i, width / 3 + width / 4, width / 3 * 2, 0, 1);
        c = lerpColor(c4, c5, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    noStroke();
    text("20F", width / 3, height - 50);
    text("55F", width/2, height -50);
    text("90F", width / 3 * 2, height - 50);


}

function drawLegend2(){
    screenNum = 5;
    var inter, c;
    var c1 = color(255);
    var c2 = color(0);

    background(190, 190, 190, 190);
    line(575, 30, 615, 70);
    line(615, 30, 575, 70);
    textSize(textSizeSmall);
    noStroke();
    fill(235);
    textAlign(CENTER);
    text("cloud cover", width / 2, 150);
    text("temperature", width / 2, height - 200);
    text("length: wind speed", width / 2, height / 2);
    text("direction; wind bearing", width / 2, height / 2 + 50);

    for (i = width / 3; i <= width / 3 * 2; i++) {
        inter = map(i, width/3, width/3*2, 0, 1);
        c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, 175, i, 225);
    }

    noStroke();
    text("0%", width / 3, 275);
    text("100%", width / 3 * 2, 275);


    var c5 = color(255, 127, 0);
    var c4 = color(127, 255, 0);
    var c3 = color(0, 255, 127);
    c2 = color(0, 127, 255);
    c1 = color(0, 0, 255);

    for (i = width / 3; i <= width / 3 + width / 12; i++) {
        inter = map(i, width / 3, width / 3 + width / 12, 0, 1);
        c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    for (i = width / 3 + width / 12; i <= width / 3 + width / 6; i++) {
        inter = map(i, width / 3 + width / 12, width / 3 + width / 6, 0, 1);
        c = lerpColor(c2, c3, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    for (i = width / 3 + width / 6; i <= width / 3 + width / 4; i++) {
        inter = map(i, width / 3 + width / 6, width / 3 + width / 4, 0, 1);
        c = lerpColor(c3, c4, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    for (i = width / 3 + width / 4; i <= width / 3 * 2; i++) {
        inter = map(i, width / 3 + width / 4, width / 3 * 2, 0, 1);
        c = lerpColor(c4, c5, inter);
        stroke(c);
        line(i, height - 150, i, height - 100);
    }
    noStroke();
    text("20F", width / 3, height - 50);
    text("55F", width/2, height -50);
    text("90F", width / 3 * 2, height - 50);

}
function drawCurrent(){
    screenNum = 1;
    var c1,c2;//c1 cloud cover; c2 temperature
    var windSpeed = currentWeather.windSpeed;
    var speed = windSpeed * 50;
    //var currentWeather = queryResult.currently;
    c1 = 255-Math.round(map(currentWeather.cloudCover,0,1,0,235));
    c1 = color(c1,c1,c1);

   c2 = currentWeather.temperature;
    var cNew = c2RGB(c2);
    setGradient(c1, cNew);
   // setNoise();
    var windBearing = currentWeather.windBearing;
    var bear = map(windBearing, 0, 360, 0, TWO_PI) - HALF_PI;

    strokeWeight(6);
    strokeJoin(MITER);
    beginShape();
    vertex(width/2 + cos(bear+0.1) * speed, height/2 + sin(bear+0.1) * speed);
    vertex(width/2, height/2);
    vertex(width/2 + cos(bear-0.1)*speed, height/2 + sin(bear-0.1)*speed);
    endShape();

    push();
        fill(255,255,255,125);
        noStroke();
        textSize(textSizeLarge+20);
        text("?", 40, 130);
    pop();
    backLevel();
}

function drawHour() {
    screenNum = 2;
    var cNew = [];
    var windBearing = [];
    var bear = [];
    var windSpeed = [];
    var speed = [];
    var c1 = [], c2 = [], i, cr, cg, cb;//c1 cloud cover; c2 temperature
    for (i = 1; i <= 48; i++) {
        c1[i] = 255 - Math.round(map(hourlyWeather[i].cloudCover, 0, 1, 0, 235));
        c1[i] = color(c1[i], c1[i], c1[i]);
    }

    for (i = 1; i <= 48; i++) {
        c2 [i] = Math.round(hourlyWeather[i].temperature);
        cNew [i] = c2RGB(c2[i]);

    }

    setGradient(c1, cNew);
    var strokeNum = 255, trans = 255;

    for (i = 1; i <= 48; i=i+4) {
        strokeWeight(6);
        strokeJoin(MITER);
        stroke(strokeNum,strokeNum,strokeNum,trans);
        windBearing [i] = hourlyWeather[i].windBearing;
        bear [i] = map(windBearing[i], 0, 360, 0, TWO_PI) - HALF_PI;
        windSpeed [i] = hourlyWeather[i].windSpeed;
        speed [i] = windSpeed[i] * 50;

        beginShape();
        fill(255,255,255,trans);
        vertex(width / 2 + cos(bear[i]+0.04) * speed [i], height / 2 + sin(bear[i]+0.04) * speed [i]);
        vertex(width/2, height/2);
        vertex(width / 2 + cos(bear[i]-0.04) * speed [i], height / 2 + sin(bear[i]-0.04) * speed [i]);
        trans = trans *.87;
        endShape();
    }
    backLevel();

    push();
    fill(255,255,255,125);
    noStroke();
    textSize(textSizeLarge+20);
    text("?", 40, 130);
    pop();

    //setNoise();
}

function drawDay(){
    screenNum = 3;
    var cNew =[];
    var c1 = [],c2 = [],i,cr,cg,cb;//c1 cloud cover; c2 temperature
    for (i=1;i<=7; i++){
        c1[i] = 255-Math.round(map(dailyWeather[i].cloudCover,0,1,0,255));
        c1[i] = color(c1[i],c1[i],c1[i]);
    }

    for (i=1;i<=7; i++){
        var high = dailyWeather[i].temperatureHigh;
        var low = dailyWeather[i].temperatureLow;

        c2[i] = Math.round((high+low)/2);
        cNew[i]= c2RGB(c2[i]);
        console.log("cNew[",i,"]=",cNew[i]);
    }

    setGradient(c1,cNew);
    backLevel();
    setNoise();
}

function setGradient(c1, c2) {
    noFill();
    var inter;
    var c, i;
    var xPos = 0;

    if (screenNum === 1) {
        for (i = 0; i <= height; i++) {
            inter = map(i, 0, height, 0, 1);
            c = lerpColor(c1, c2, inter);
            stroke(c);
            line(0, i, width, i);
        }
    }
    if (screenNum === 2) {
        for (var h = 1; h <= 48; h++) {
            for (i = 0; i <= height; i++) {
                inter = map(i, 0, height, 0, 1);
                c = lerpColor(c1[h], c2[h], inter);
                stroke(c);
                line(xPos, i, width * (h) / 48, i);
            }
            xPos = width * (h) / 48;
        }
    }
    if (screenNum === 3) {
        for (var d = 1; d <= 7; d++) {
            for (i = 0; i <= width; i++) {
                inter = map(i, 0, width, 0, 1);
                c = lerpColor(c1[d], c2[d], inter);
                stroke(c);
                line(i,xPos, i, height * (d) / 7);
            }
            xPos = height * (d) / 7;
        }
    }
}

function c2RGB(c2){
    var cr,cg,cb;
    var c2Mapped;
    //if (screenNum ===2||screenNum === 1){
    c2Mapped = map(c2,20,90,0,1);
    if (c2Mapped>=0.75){cr=255;Math.round(cg =-1020*c2Mapped+1020); cb=0;}
    if (c2Mapped>=0.5&&c2Mapped<0.75){cr = Math.round(764*c2Mapped-382); cg = 255; cb = 0;}
    if (c2Mapped>=0.25&&c2Mapped<0.5){cr = 0;cg = 255; cb = Math.round(-764*c2Mapped+446);}
    if (c2Mapped<0.25){cr = 0;cg = Math.round(764*c2Mapped); cb = 255;}

    c2 = color(cr,cg,cb);
    return c2;
}

function setNoise(){
    var precipProb,humidity;
    var pPos,hPos;
    var xoff = 0;
    var x, y;
    if (screenNum===1){
        var currentWeather = queryResult.currently;
        precipProb = currentWeather.precipProbability;
        humidity = currentWeather.humidity;
        pPos = map(precipProb,0,1,0,height);
        hPos = map(humidity,0,1,height,200);
        strokeWeight(8);
        stroke(255);
        beginShape();// We are going to draw a polygon out of the wave points

        for (x = 0; x <= width; x += 10) {  // Iterate over horizontal pixels
            y = map(noise(xoff, hPos), 0, 1, 80,height/6);// Calculate a y value according to noise, map to
            vertex(x, y+pPos*.8); // Set the vertex
            xoff += pPos;  // Increment x dimension for noise
        }
        //yoff += 0.1;  // increment y dimension for noise
        endShape();
        console.log(precipProb,humidity);
    }
    if (screenNum===2){
        var hourlyWeather = queryResult.hourly.data;
        var precipProbs = [], humidities = [];

        for (var i=1;i<=48;i++){
            precipProbs[i] = hourlyWeather[i].precipProbability;
            humidities[i] = hourlyWeather[i].humidity;
        }
        var strokeNum = 255;
        var trans = 255;

        for (i=1;i<=48;i+=3){
            beginShape();// We are going to draw a polygon out of the wave points
            strokeWeight(3);
            stroke(strokeNum,strokeNum,strokeNum,trans);
            trans = trans * 0.8;
            pPos = map(precipProbs[i],0,1,0,height);
            hPos = map(humidities[i],0,1,height,200);
            for (x = 0; x <= width; x += 10) {  // Iterate over horizontal pixels
                y = map(noise(xoff, hPos), 0, 1, 80,height/6);// Calculate a y value according to noise, map to
                vertex(x, y+pPos*.8); // Set the vertex
                xoff += .99;  // Increment x dimension for noise
            }
            yoff += 0.1;  // increment y dimension for noise
            endShape();
        }
    }
    if (screenNum===3){
        dailyWeather = queryResult.daily.data;
        var precipProbs3 = [], humidities3 = [];
        for (i=1;i<=7;i++){
            precipProbs3[i] = dailyWeather[i].precipProbability;
            humidities3[i] = dailyWeather[i].humidity;
        }
        strokeNum = 255;
        trans = 255;

        for (i=1;i<=7;i++){
            beginShape();// We are going to draw a polygon out of the wave points
            strokeWeight(3);
            stroke(strokeNum,strokeNum,strokeNum,trans);
            trans = trans * 0.6;
            pPos = map(precipProbs3[i],0,1,0,height);
            hPos = map(humidities3[i],0,1,height,0);
            for (x = 0; x <= width; x += 10) {  // Iterate over horizontal pixels
                y = map(noise(xoff, hPos), 0, 1, 80,height/6);// Calculate a y value according to noise, map to
                vertex(x,y+ i*height/7-200); // Set the vertex
                xoff += .99;  // Increment x dimension for noise
            }
            //yoff += 0.1;  // increment y dimension for noise
            endShape();
        }
    }
}

function backLevel() {
    stroke(255);
    strokeWeight(6);
    line(50, 30, 30, 50);
    line(30, 50, 50, 70);
}