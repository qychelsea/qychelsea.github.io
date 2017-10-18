var table = [];
var esTab = [],empSzes = [],zipCode = [];
var colour212,colour220,colour230,colour241,colour242,colour251,colour252,colour254,colour260;

//MapBox Token
//pk.eyJ1IjoicXljaGVsc2VhIiwiYSI6ImNpcHFhZ3d3ODAwNXlod25wbDA2eWZta3IifQ.hEGkyGTCvHlqBm14G4pzxA


function preload(){
    for (var i = 1994; i<=2015; i++){
        table [i] = loadTable('data/zbp'+i+'.csv', 'csv', 'header');
    }
}

function setup() {
    createCanvas(1200, 1500);
    background(235);
    colour212=color(190),colour220=color(170),colour230=color(150),colour241=color(130),colour242=color(110),colour251=color(90),colour252=color(70),colour254=color(50),colour260=color(30);

    sortData();

}

function sortData(){
    //sort 1994-1997
    for(var i = 1994;i<=1997;i++){
        esTab[i]=table[i].getColumn("ESTAB");
        empSzes[i]=table[i].getColumn("EMPSZES");
        zipCode[i]=table[i].getColumn("zipcode");
        console.log("empSzes["+i+"]=",empSzes[i]);
    }
    drawData();
}

function drawData(){
    var xPos=50,yPos=100,xGap=50,yGap=2;
    var longestStr=0;
   // var z=zipCode[1994][0];
    for(var i = 1994;i<=1997;i++){
        for(var n = 0;n<=esTab[i].length;n++){
            console.log("n=",n);
            if (empSzes[i][n]!==1&&esTab[i][n]!==0){
                for (var j=0;j<esTab[i][n];j++){
                    //stroke(colour(empSzes[i][n]));
                    stroke(190);
                    line(xPos,yPos,xPos+50,yPos);
                    yPos=yPos+2;
                    console.log("yPos=",yPos);
                }
            } else if (empSzes[i][n]===1){
                xPos=xPos+100;
                yPos=100;
                if (esTab[i][n]>longestStr){
                    longestStr=esTab[i][n];
                    console.log("longest string=",longestStr);
                }
            }
        }
        yPos=longestStr+50;
    }
}