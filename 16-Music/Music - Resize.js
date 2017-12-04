var music,musicName;
var track, beat, endTime;
var trackStamp=[],note = [],channelEvent=[], timeStamp = [],velocity=[],tempo=[],musicDuration;
var i,j,t=0; //t track counter
var trackStartLine=[];
var offFromCFactor=7, noteDurationFactor=40,innerRadius=205;
var r,g,b;
var highestNote=0,lowestNote=108; //highest on track 1; lowest on track 3
var tempoSorted =[];
var musicImg;
var canvasW;

function preload(){
    //musicName="The_Four_Seasons_3";
    //musicName="BWV_1080_The_Art_of_Fugue_Contrapunctus_1";
    //musicName="BWV_988_Goldberg_Variations_Variation_17";
    //musicName="Moonlight_Sonata_Movement_3";
    //musicName="Liebestraum_3";
    //musicName="La_Campanella";
    //musicName="Secret";
    musicName="Waltz_in_A_minor";
    //musicName="Fur_Elise";
    //musicName="Fantaisie_Impromptu";
    //musicName="Flight_of_the_Bumblebee";
    //musicName="Dance_of_the_Sugar_Plum_Fairy";

    music = loadTable('data/'+musicName+'.csv', 'csv');
    myFont = loadFont('assets/SpectralSC-Regular.ttf');

    myMusic = loadSound('data/'+musicName+'.mp3');
}

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvasW=height*0.8;
    innerRadius=canvasW/4;
    noteDurationFactor=32000/canvasW;


    canvas.position(0,0);
    sortData();

    myMusic.setVolume(1);
    myMusic.play();
    myMusic.loop();

    drawMusic();
    drawLabel();
    //getImgPxl();
    //saveCanvas(musicName+'.jpg');
}

function sortData(){
    track=music.get(0,4);
    beat=music.get(0,5);
    trackStamp=music.getColumn(0);
    timeStamp=music.getColumn(1);
    channelEvent=music.getColumn(2);
    tempo=music.getColumn(3);
    note=music.getColumn(4);
    velocity=music.getColumn(5);
    endTime=timeStamp[music.getRowCount()-2];

    console.log("music end time=",endTime);
    console.log("track=",track);
    for (j = 0; j <= music.getRowCount(); j++) {  //get start line for each track
        if (channelEvent[j] == ' Start_track') {
            t++;
            for (i = 0; i <= music.getRowCount(); i++) {
                if (channelEvent[j + i] == ' Note_on_c') {
                    trackStartLine[t] = j + i;
                    //console.log("trackStartLine=", trackStartLine[t]);
                    i = music.getRowCount() + 2;
                }
            }
        }
    }
    for (j=trackStartLine[1];j<=music.getRowCount();j++){

        if (channelEvent[j]==' Note_on_c'&&trackStamp[j]==='1'&&velocity[j]!=0&&note[j]>highestNote){
            highestNote=note[j];
        }
    }

    for(j=trackStartLine[track];j<=music.getRowCount();j++){
        if (channelEvent[j]==' Note_on_c'&&trackStamp[j]===track&&velocity[j]!=0&&note[j]<lowestNote){//
            lowestNote=note[j];
        }
    }
    console.log("lowest Note=",lowestNote);//DOESN'T WORK FOR SOME PIECES
    console.log("highest Note=",highestNote);

    //graph boundary adjustments
    offFromCFactor=-0.1*highestNote+14;

    if (lowestNote<25){innerRadius=300;}


    //sort tempo
    for (var tp=0;tp<=endTime;tp++){
        tempoSorted[tp]=0;
    }
    for (var i=0;i<=music.getRowCount();i++){
        if(channelEvent[i]==' Tempo'){
            tempoSorted[timeStamp[i]]=tempo[i];
        }
    }
}

function drawMusic(){
    //textFont(myFont);
    translate(width/2-canvasW/2,0);
    clear();
    strokeCap(SQUARE);
    background(249, 242, 236);//249, 242, 236
    var trackRadius = [];
    var noteCurrent, velocityCurrent, noteCurrentDuration, noteCurrentCenterX, noteCurrentCenterY;
    var offFromC, tc, s;//tc: track count; s: a clock's second hand
    var sustainDuration;
    var pauseCheck=[];

    for (t = 1; t <= track; t++) {
        trackRadius[t] = innerRadius;//track by set radius
        push();
        stroke(190);
        strokeWeight(1);
        noFill();
        //ellipse(width/2,width/2,trackRadius[t]);
        pop();
    }

    for (j = 0; j <= music.getRowCount(); j++) {
        if (channelEvent[j] == ' Note_on_c' && velocity[j] != 0) {//find start of note
            noteCurrent = note[j];
            velocityCurrent = velocity[j];
            for (i = 1; i <= music.getRowCount(); i++) {//find end of note
                if (velocity[i + j] == 0 && noteCurrent === note[i + j]) {
                    noteCurrentDuration = timeStamp[i + j] - timeStamp[j];

                    s = map(timeStamp[j], 0, endTime, 0, TWO_PI) - HALF_PI;
                    tc = trackStamp[j];//tc: track count
                    offFromC = noteCurrent - 60;

                    noteCurrentCenterX = canvasW / 2 + cos(s) * (innerRadius + offFromC * offFromCFactor);
                    noteCurrentCenterY = canvasW / 2 + sin(s) * (innerRadius + offFromC * offFromCFactor);

                    push();//draw note as circle
                    noStroke();
                    fill(155, 155, 155, 75);
                    ellipse(noteCurrentCenterX, noteCurrentCenterY, noteCurrentDuration / noteDurationFactor);
                    pop();

                    i = music.getRowCount() + 2;//escape from loop
                }
            }
        }
        if (channelEvent[j] == ' Control_c' && note[j] == 64 && velocity[j] != 0) {//find start of sustain/////channelEvent[j] == ' Control_c'&&
            velocityCurrent = velocity[j];
            for (i = 0; i <= music.getRowCount(); i++) {//find end of sustain
                if (velocity[i + j] == 0) {
                    //sustainDuration = timeStamp[i + j] - timeStamp[j]; unused

                    s = map(timeStamp[j], 0, endTime, 0, TWO_PI) - HALF_PI;
                    var sEnd = map(timeStamp[j + i], 0, endTime, 0, TWO_PI) - HALF_PI;
                    tc = trackStamp[j];

                    var sustainStartX = canvasW / 2 + cos(s) * (innerRadius);
                    var sustainStartY = canvasW / 2 + sin(s) * (innerRadius);
                    var sustainEndX = canvasW / 2 + cos(sEnd) * (innerRadius);
                    var sustainEndY = canvasW / 2 + sin(sEnd) * (innerRadius);

                    push();//draw sustain as line
                    noFill();
                    strokeWeight(12);
                    stroke(45, 89, 134,50);
                    line(sustainStartX, sustainStartY, sustainEndX, sustainEndY);
                    pop();

                    i = music.getRowCount() + 2;
                }
            }
        }
    }

    for (var j = 1; j < track; j++) {//if notes from different tracks are pressed at the same time
        for (i = 1; i < track; i++) {
            if (i + j <= track) {
                for (var k = trackStartLine[j]; k <= trackStartLine[j + 1]; k++) {
                    var mEnd = trackStartLine[j + i + 1];
                    if (j + i + 1 > track) {
                        mEnd = music.getRowCount();
                    }
                    for (var m = trackStartLine[j + i]; m <= mEnd; m++) {
                        if (timeStamp[k] === timeStamp[m] && channelEvent[k] == ' Note_on_c' && channelEvent[m] == ' Note_on_c' && velocity[k] != 0 && velocity[m] != 0) {
                            console.log("hi=");

                            var offFromCk = note[k] - 60;
                            var offFromCm = note[m] - 60;

                            s = map(timeStamp[k], 0, endTime, 0, TWO_PI) - HALF_PI;
                            sEnd = map(timeStamp[m], 0, endTime, 0, TWO_PI) - HALF_PI;

                            var pressStartX = canvasW / 2 + cos(s) * (innerRadius + offFromCk * offFromCFactor);
                            var pressStartY = canvasW / 2 + sin(s) * (innerRadius + offFromCk * offFromCFactor);
                            var pressEndX = canvasW / 2 + cos(sEnd) * (innerRadius + offFromCm * offFromCFactor);
                            var pressEndY = canvasW / 2 + sin(sEnd) * (innerRadius + offFromCm * offFromCFactor);

                            push();
                            stroke(102, 102, 153);
                            strokeWeight(.15);

                            line(pressStartX, pressStartY, pressEndX, pressEndY);
                            pop();
                        }
                    }
                }
            }
        }
    }

/*    for (t=1;t<=track;t++){//draw pauses
        mEnd = trackStartLine[t+1];
        if (t+1 > track) {
            mEnd = music.getRowCount();
        }
        for (p=0;p<=endTime;p++){
            pauseCheck[p]=0;
        }
        for (j=trackStartLine[t];j<=mEnd;j++) {
            if (channelEvent[j] == ' Note_on_c' && velocity[j] != 0) {
                for (i = 1; i<= mEnd - trackStartLine[i]; i++) {
                    if (note[j] === note[j + i] && velocity[j + i] == 0&& trackStamp[i+j]==t) {//
                        for (var p = timeStamp[j]; p <= timeStamp[j + i]; p++) {
                            pauseCheck[p] = 1;//has sound =1;
                        }
                    }
                }
            }
        }
        for(i=0;i<=endTime;i=i+500) {
            if (pauseCheck[i] === 0) {//start of pause
                s = map(i, 0, endTime, 0, TWO_PI) - HALF_PI;
                var pauseStartX = canvasW / 2 + cos(s) * ((track-t+1) * 25+25);
                var pauseStartY = canvasW / 2 + sin(s) * ((track-t+1) * 25+25);
                for (var l = 1; l <= endTime - i; l = l + 500) {
                    if (pauseCheck[i + l] == 1) {
                        sEnd = map(i + l, 0, endTime, 0, TWO_PI) - HALF_PI;
                        var pauseEndX = canvasW / 2 + cos(sEnd) * ((track-t+1) * 25);
                        var pauseEndY = canvasW / 2 + sin(sEnd) * ((track-t+1) * 25);
                        l = endTime;
                    }
                }
            }
            push();
            strokeWeight(.5);
            stroke(51, 51, 77,35);
            line(pauseStartX, pauseStartY, pauseEndX, pauseEndY);
            pop();
        }
    }*/
}

function drawLabel(){//display csv file name
    textFont(myFont,18);
    noStroke();
    fill(125,125,125);
    textAlign(CENTER);
    text(musicName,canvasW/2,height*.9); //WHY WOULDN'T DISPLAY NAME WITH SPACES?
}

function getImgPxl(){
    var c=[];
    musicImg=createImage(canvasW,height);
    musicImg.loadPixels();

    for (h=0;h<=height;h++) {
        for (w = 0; w <= canvasW; w++) {
            c = get(w, h);
            musicImg.set(w,h,c);
        }
    }
    musicImg.updatePixels();
}

function draw() {

    img(musicImg, 0, 0);


}

/*    var timeTik,timeElapsed=millis();
    timeTik = map(timeElapsed, 0, endTime, 0, TWO_PI) - HALF_PI;
    var tikStartX = canvasW / 2 + cos(timeTik) * (300);
    var tikStartY = canvasW / 2 + sin(timeTik) * (300);

    push();
    stroke(255,0,0);
    ellipse(tikStartX,tikStartY,8);
    pop();*/

    //musicPlay();
    //musicPause();
    //text(myMusic.currentTime(),canvasW/2,height-200);