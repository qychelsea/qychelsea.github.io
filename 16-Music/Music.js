var music,musicName;
var track, beat, endTime;
var trackStamp=[],note = [],channelEvent=[], timeStamp = [],velocity=[],musicDuration;
var i,j,t=0; //t track counter
var trackStartLine=[];
var offFromCFactor=7, noteDurationFactor=40,innerRadius=205;
var r,g,b;
var highestNote=0,lowestNote=108; //highest on track 1; lowest on track 3

function preload(){
    //musicName="The Four Seasons_1";
    //musicName="BWV_1080_The_Art_of_Fugue_Contrapunctus_13";
    //musicName="BWV_988_Goldberg_Variations_Variation_30";
    //musicName="Moonlight Sonata Movement 3";
    //musicName="Liebestraum_3";
    //musicName="La Campanella";
    musicName="Secret";

    music = loadTable('data/'+musicName+'.csv', 'csv');

    myFont = loadFont('assets/SpectralSC-Regular.ttf');
}

function setup() {
    var canvas = createCanvas(800,1000);
    canvas.position(0,0);
    sortData();
    drawMusic();
    drawLabel();
    //saveCanvas(musicName+'.jpg');
}

function sortData(){
    track=music.get(0,4);
    beat=music.get(0,5);
    trackStamp=music.getColumn(0);
    timeStamp=music.getColumn(1);
    channelEvent=music.getColumn(2);
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
    if (highestNote>80){offFromCFactor=6;}
    if (highestNote>90){offFromCFactor=5;}
    if (highestNote>98){offFromCFactor=4;}

    if (lowestNote<25){innerRadius=300;}
}

function drawMusic(){
    //textFont(myFont);
    clear();
    strokeCap(SQUARE);
    background(249, 242, 236);
    var trackRadius = [];
    var noteCurrent, velocityCurrent, noteCurrentDuration, noteCurrentCenterX, noteCurrentCenterY;
    var offFromC, tc, s;//tc: track count; s: a clock's second hand
    var sustainDuration;

    for (t = 1; t <= track; t++) {
        trackRadius[t] = innerRadius;//track by set radius
        push();
        stroke(190);
        strokeWeight(1);
        noFill();
        //ellipse(width/2,width/2,trackRadius[t]);
        pop();
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

                            var pressStartX = width / 2 + cos(s) * (trackRadius[j] + offFromCk * offFromCFactor);
                            var pressStartY = width / 2 + sin(s) * (trackRadius[j] + offFromCk * offFromCFactor);

                            var pressEndX = width / 2 + cos(sEnd) * (trackRadius[i + j] + offFromCm * offFromCFactor);
                            var pressEndY = width / 2 + sin(sEnd) * (trackRadius[i + j] + offFromCm * offFromCFactor);

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

                    noteCurrentCenterX = width / 2 + cos(s) * (trackRadius[tc] + offFromC * offFromCFactor);
                    noteCurrentCenterY = width / 2 + sin(s) * (trackRadius[tc] + offFromC * offFromCFactor);

                    push();//draw note as circle
                    noStroke();
                    fill(155, 155, 155, 85);
                    ellipse(noteCurrentCenterX, noteCurrentCenterY, noteCurrentDuration / noteDurationFactor);
                    pop();

/*
                    //find pauses in tracks
                    for (t = 1; t <= track; t++) {
                        var pauseCheck =[];
                        for (var p=timeStamp[j];p<=timeStamp[j+i];p++){
                            pauseCheck[timeStamp[p]]=1;//has sound =1;
                        }
                    }

                    push();
                    stroke(255,0,0);
                    for (p=0;p<=endTime;p++){
                        if (pauseCheck[p]!=1) {
                            var pauseX = width / 2 + cos(s) * (500);
                            var pauseY = width / 2 + sin(s) * (500);
                            push();
                            fill(255,0,0);
                            ellipse(pauseX,pauseY,3);
                            pop();
                        }
                    }
                    pop();
*/

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

                    var sustainStartX = width / 2 + cos(s) * (trackRadius[tc]);
                    var sustainStartY = width / 2 + sin(s) * (trackRadius[tc]);
                    var sustainEndX = width / 2 + cos(sEnd) * (trackRadius[tc]);
                    var sustainEndY = width / 2 + sin(sEnd) * (trackRadius[tc]);

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
}

function drawLabel(){//display csv file name
    textFont(myFont,18);
    noStroke();
    fill(125,125,125);
    textAlign(CENTER);
    text(musicName,width/2,height-150); //WHY WOULDN'T DISPLAY NAME WITH SPACES?
}

