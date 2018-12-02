var keyCode;
var img=[];
var t='day';
var n;
var canvas;
var newWidth, newHeight;
var imgLength=14; ///please remember to change

function preload() {
    for (n = 1; n <= imgLength; n++) {
        img[n] = loadImage('images/essay/'+t + n + '.png');
    }
    n=1;
}

function setup() {
}

function draw(){
    canvas=createCanvas(window.innerWidth, window.innerHeight);
    newWidth=width*0.75;
    newHeight=newWidth/2500*1500;
    canvas=createCanvas(newWidth,newHeight);

    imageMode(CORNER);
    //tint(190,233,19);

    fill(50);

    image(img[n], 0,0,newWidth,newHeight);
/*
    text("n="+n, 50,50);
    text("newWidth="+newWidth, 50,60);
    text("mouseX="+mouseX, 50,70);
    text("newHeight="+newHeight, 50,80);
    text("mouseY="+mouseY, 50,90);
*/

    fill(50);
    text("Home", 50,newHeight-25);
    text("Time", newWidth-100, newHeight-25);
//home, time hover
    if (mouseY > newHeight - 50) {
        if (mouseX<100){
            fill(255,69,0);
            rect(45, newHeight-40, 42, 20);
            fill(235);
            text("Home", 50,newHeight-25);
        }
        if (mouseX>newWidth-150){
            fill(255,69,0);
            rect(newWidth-105, newHeight-40, 42, 20);
            fill(235);
            text("Time", newWidth-100,newHeight-25);
        }
    }



//circle menu
    var r=7;
    var circle=[];
    for (var i=1; i<=imgLength;i++){
        noStroke();
        fill(190);
        if (i===n){
            fill(255,69,0);}
        circle[i]=ellipse((newWidth-imgLength*25)/2+i*25,newHeight-25, r);
    }

//hover scroll bar
    if((mouseY>newHeight-25-7)&&(mouseY<newHeight-25+7)){
        var m;
        //text("in here", 50,120);
        if (mouseX>((newWidth-imgLength*25)/2-5)&&mouseX<(newWidth-(newWidth-imgLength*25)/2)){
            m=Math.round((mouseX-((newWidth-imgLength*25)/2))/25);
            text("m="+m, 50,220);
            if(m<1){m=1;}
            background(190);
            image(img[m], 0,0,newWidth,newHeight);
            for (i=1; i<=imgLength;i++){
                //stroke(190);
                fill(190);
                //noFill();
                if (i===m){
                    fill(120);}
                circle[i]=ellipse((newWidth-imgLength*25)/2+i*25,newHeight-25, r);
            }
        }
    }
}


function mousePressed() {
    if (mouseY < newHeight - 50) {
        if (mouseX < newWidth / 2) {
            n--;
            if (n === 0) {
                n = imgLength;
            }
        }
        if (mouseX >= newWidth / 2) {
            n++;
            if (n > imgLength) {
                n = 1;
            }
        }
    }else{
        if (mouseX<100){
            window.open("index.html","_self");
        }
        if (mouseX>newWidth-150){
            window.open("essay-night-cover.html","_self");
        }
        if (mouseX > ((newWidth - imgLength * 25) / 2 - 5) && mouseX < (newWidth - (newWidth - imgLength * 25) / 2)) {
                var c = Math.round((mouseX - ((newWidth - imgLength * 25) / 2)) / 25);
                image(img[c], 0, 0, newWidth, newHeight);
                n = c;
            }
    }

}

function mouseWheel(){
    if (event.delta>0) {
        n++;
        if (n > imgLength) {
            n = 1;
        }
    }
    else{
        n--;
        if (n === 0) {
            n = imgLength;
        }
    }
}