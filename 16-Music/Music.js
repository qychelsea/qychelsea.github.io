var music;
var track, beat, endTime;
var trackStamp=[],note = [],channelEvent=[], timeStamp = [],velocity=[],musicDuration;
var i,j,t=0, margin=500; //c for keeping tract row of first note;t track counter
var trackStartLine=[];
var offFromCFactor=4;

function preload(){
    music = loadTable('data/Liebestraum.csv', 'csv');
    //music = loadTable('data/BWV_1080_The_Art_of_Fugue_Contrapunctus_12.csv', 'csv');
    //myFont = loadFont('assets/Steelworks Vintage Demo.otf');
}

function setup() {
    var canvas = createCanvas(800,800);
    canvas.position(0,0);
    sortData();
    drawMusic();
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
}



function drawMusic(){
    //textFont(myFont);
    clear();
    fill(155,155,155,35);
    strokeCap(SQUARE);

    //strokeWeight(1);
    background(249, 242, 236);
    var trackGap=(width-margin)/(track),trackRadius = [];
    var noteCurrent, velocityCurrent,noteCurrentDuration, noteCurrentCenterX,noteCurrentCenterY;
    var offFromC,tc,s;//tc: track count
    var sustainDuration;

    for (t=1;t<=track;t++){
        trackRadius[t]=(width-margin)-(t-1)*trackGap;

    }

    for (j = 0; j <= music.getRowCount(); j++){
        if (channelEvent[j] == ' Note_on_c'&&velocity[j]!=0) {//find start of note
            noteCurrent=note[j];
            velocityCurrent=velocity[j];
            for (i = 0; i <= music.getRowCount(); i++){//find end of note
                if (velocity[i+j]==0&&noteCurrent===note[i+j]){
                    noteCurrentDuration = timeStamp[i + j] - timeStamp[j];

                    s = map(timeStamp[j], 0,endTime, 0, TWO_PI) - HALF_PI;
                    tc=trackStamp[j];//tc: track count
                    offFromC=noteCurrent-60;

                    noteCurrentCenterX=width/2 + cos(s) * (trackRadius[tc]+offFromC*offFromCFactor);
                    noteCurrentCenterY=height/2 + sin(s) * (trackRadius[tc]+offFromC*offFromCFactor);

                    /*  push();//draw note as circle
                      noStroke();
                      ellipse(noteCurrentCenterX, noteCurrentCenterY, noteCurrentDuration/20);
                      pop();*/

                    stroke(75);//draw note as line
                    line(noteCurrentCenterX, noteCurrentCenterY,noteCurrentCenterX+noteCurrentDuration/40,noteCurrentCenterY);

                    i = music.getRowCount() + 2;
                }
            }
        }
        if (note[j]==64&&velocity[j]!=0) {//find start of sustain/////channelEvent[j] == ' Control_c'&&
            velocityCurrent = velocity[j];

            for (i = 0; i <= music.getRowCount(); i++) {//find end of sustain
                if (velocity[i + j] == 0) {
                    sustainDuration = timeStamp[i + j] - timeStamp[j];

                    s = map(timeStamp[j], 0,endTime, 0, TWO_PI) - HALF_PI;
                    var sEnd = map(timeStamp[j+i], 0,endTime, 0, TWO_PI) - HALF_PI;
                    tc=trackStamp[j];

                    var sustainStartX=width/2 + cos(s) * (trackRadius[tc]);
                    var sustainStartY=height/2 + sin(s) * (trackRadius[tc]);
                    var sustainEndX=width/2 + cos(sEnd) * (trackRadius[tc]);
                    var sustainEndY=height/2 + sin(sEnd) * (trackRadius[tc]);

                    push();//draw sustain as circle
                    noStroke();
                    fill(155,155,155,45);
                    ellipse(sustainStartX, sustainStartY, sustainDuration/20);
                    pop();

                    push();//draw sustain as line
                    noFill();
                    stroke(255,0,0);
                    line(sustainStartX,sustainStartY,sustainEndX,sustainEndY);
                    pop();
                    //arc(width/2, height/2, sustainDuration/20,sustainDuration/20,)

                    i = music.getRowCount() + 2;
                }
            }
        }
    }
    for (var j=1;j<track;j++) {//if notes from different tracks are pressed at the same time
       for (i=1;i<track;i++) {
           if (i + j <= track) {
               for (var k = trackStartLine[j]; k <= trackStartLine[j + i] - trackStartLine[j + i - 1]; k++) {
                   for (var m = trackStartLine[j + i]; m <= trackStartLine[j + i + 1] - trackStartLine[j + i]; m++) {
                       if (timeStamp[k] === timeStamp[m]) {
                           s = map(timeStamp[k], 0, endTime, 0, TWO_PI) - HALF_PI;
                           sEnd = map(timeStamp[k + m], 0, endTime, 0, TWO_PI) - HALF_PI;

                           tc = timeStamp[k];
                           var pressStartX = width/2 + cos(s) * (trackRadius[tc]);
                           var pressStartY = height/2 + sin(s) * (trackRadius[tc]);

                           tc = timeStamp[k+m];
                           var pressEndX = width/2 + cos(s) * (trackRadius[tc]);
                           var pressEndY = height/2 + sin(s) * (trackRadius[tc]);

                           stroke(0,0,255);
                           strokeWeight(3);
                           console.log("hi=");

                           line(pressStartX,pressStartY,pressEndX,pressEndY);
                       }

                   }

               }

           }
       }
    }
}

