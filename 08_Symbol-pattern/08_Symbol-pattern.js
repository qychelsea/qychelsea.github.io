var hourNum, minuteTen, minuteDigit;
var imgH = [], imgMT =[],imgM = [];
var imgCan,imgAPM;

function preload(){
    imgCan = loadImage('img/canvas.png');
    //imgAPM = loadImage('img/apm.png');

    for (var i=1;i<=12;i++)
        imgH [i] = loadImage('img/h' + i + '.png');
    for (i=1;i<=5;i++)
        imgMT [i] = loadImage('img/mt'+i +'.png');
    for (i=1;i<=9;i++)
        imgM [i] = loadImage('img/m'+i +'.png');
    }

function setup() {
    createCanvas(700, 700);
    background(235);
}

function draw() {

    background(235);
    image(imgCan,0,0, imgCan.width, imgCan.height);
    hourNum = hour();
    minuteTen = Math.floor(minute() / 10);
    minuteDigit = minute() % 10;

    if (hour()>12){
        hourNum = hourNum -12;
        //image(imgAPM,0,0,imgAPM.width, imgAPM.height);
    }
    textSize(60);
    fill(0);
    if (hour()>=12){
        text("PM",575,450);
    }else{
        text("AM",575,450);
    }
    if (hour()>0)
        image(imgH[hourNum], 0,0, imgH.width, imgH.height);
    if (minuteTen>0)
        image(imgMT[minuteTen], 0,0, imgMT.width, imgMT.height);
    if (minuteDigit>0)
        image(imgM[minuteDigit], 0,0, imgM.width, imgM.height);
}

