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
    createCanvas(windowWidth, windowHeight);
    background(235);
    colour212=color(190),colour220=color(170),colour230=color(150),colour241=color(130),colour242=color(110),colour251=color(90),colour252=color(70),colour254=color(50),colour260=color(30);

    sortData();

}

function sortData(){
    //sort 1994-1997 (SIC)
    for(var i = 1994;i<=2015;i++){
        esTab[i]=table[i].getColumn("ESTAB");
        empSzes[i]=table[i].getColumn("EMPSZES");
        //zipCode[i]=table[i].getColumn("zipcode");
        console.log("esTab["+i+"]=",esTab[i]);//problem from 1998 on. data not matching
        console.log("empSzes["+i+"]=",empSzes[i]);//problem from 1998 on.
    }


    //sort 1998-2002(NAICS1997),2003-2007(NAICS2002),2008-2011(NAICS2007),2012-2015(NAICS2012)
    var listLength,j;
    for (i=1998;i<=2015;i++){//to account for relevant NAICS# under 2 categories
        listLength = table[i].getRowCount();
        console.log("list length",i,"=", listLength);
        for(j=0;j<listLength/2;j++){
            esTab[i][j]=esTab[i][listLength/2+j]+esTab[i][j];
            empSzes[i][j]=empSzes[i][listLength/2+j]+empSzes[i][j];
            //console.log("year=",i,",new esTab["+j+"]=",esTab[j],",new empSzes["+j+"]=",empSzes[j],)
        }
    }


 /*   for (i=1998;i<=2015;i++){
        var listLength = table[i].getRowCount();
        console.log("list length = ", listLength);
        for(var j=0;j<listLength/2;j++){
            esTab[i][j]=table[i].getNum(3,j);
            empSzes[i][j]=table[i].getNum(3,j);
            //zipCode[i][j]=table[i][j].getNum("zipcode",j);
        }
        var k=0;
        for (j=listLength/2;j<=listLength;j++){
            esTab[i][k]=table[i].getNum(3,j)+esTab[i][k];
            empSzes[i][k]=table[i].getNum(3,j)+ empSzes[i][k];
            //zipCode[i][k]=table[i][j].getColumn("zipcode",j)+zipCode[i][k];
        }
        //console.log("empSzes["+i+"]=",empSzes[i]);
    }*/
    drawData();
}

function drawData(){
    var xPos=50,yPos=100,xGap=50,yGap=1;
    var lineLength=20;
    var longestStr;
    var c=190;
    stroke(c);
    for(var i = 1994;i<=1997;i++){
        stroke(c);
        longestStr=0;
        for(var n = 0;n<=esTab[i].length;n++){
            if (empSzes[i][n]==1) {
                xPos = xPos + lineLength + 5;
                yPos = 100;
                /*if (longestStr<esTab[i][n]) {
                    console.log("i=",i,"n=",n,"esTab[i][n]=",esTab[i][n],"empSzes[i][n]=",empSzes[i][n],"old longest string=",longestStr);
                    longestStr = esTab[i][n];
                    console.log("new longest string=", longestStr);
                }*/  //longest string tracking not working
            }
            if (empSzes[i][n]!=1){
                //console.log("i=",i,"n=",n,"esTab[i][n]=",esTab[i][n],"empSzes[i][n]=",empSzes[i][n],",yPos=",yPos,"xPos=",xPos,"colour=",c);
                for (var j=0;j<esTab[i][n]/20;j++){
                   //stroke(colour(empSzes[i][n]));
                    line(xPos,yPos,xPos+lineLength,yPos);
                    yPos=yPos+2;
                    }
            }

        }
        c=c-30;
    }
    yPos=longestStr+50;
}