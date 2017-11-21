var music;
var track, beat, musicDuration, startTime;
var note = [],channelEvent=[], timeStamp = [],channelValue=[];
var i, margin=100;

function preload(){
    music = loadTable('data/Liebestraum.csv', 'csv');
    //myFont = loadFont('assets/Steelworks Vintage Demo.otf');
}

function setup() {
    var canvas = createCanvas(800,800);
    canvas.position(0,0);
    sortData();


}

function sortData(){
    track=music.get(0,4);
    beat=music.get(0,5);
    timeStamp=music.getColumn(1);
    channelEvent=music.getColumn(2);
    note=music.getColumn(4);
    channelValue=music.getColumn(5);

    //console.log("timeStamp=",music.getRowCount());
    musicDuration=timeStamp[music.getRowCount()-2];

    console.log("music duration=",musicDuration);
    //
    // for (i=0;i<=music.getRowCount();i++){
    //     if(channelEvent[i]=='Note_on_c'){
    //         startTime=timeStamp[i];
    //         console.log("startTime=,",startTime);
    //
    //         break;}
    // }


}

function draw(){
    //textFont(myFont);
    clear();
    noFill();
    background(249, 242, 236);
    var trackGap=(width-margin)/(track),trackRadius = [];
    var noteCurrent, velocityCurrent;

    for (i=1;i<=track;i++){//draw tracks
        trackRadius[i]=(width-margin)-(i-1)*trackGap;
        ellipse(width/2,height/2,trackRadius[i]);
    }

    var timeCurrent =[];
    for (i=0;i<=music.getRowCount();i++) {
        timeCurrent[i]=map(timeStamp, 0, musicDuration, 0, TWO_PI) - HALF_PI;
        console.log("timeCurrent=", timeCurrent[i]);
    }


}
