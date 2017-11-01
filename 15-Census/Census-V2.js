var table = []; neighbourhood = [];
var esTab = [],empSzes = [],zipCode=[],neighZip = [], neighName=[];
var canvasX=605, canvasY = 0, marginSlider=100, marginBase=150;
var zipCurrent;
//var counter=0;
var xGap=15;
var lineLength=10;
var myFont;

function preload(){
    for (var i = 1998; i<=2015; i++){
        table [i] = loadTable('data/zbp'+i+'.csv', 'csv', 'header');
    }
    neighbourhood = loadTable('data/Neighbourhood.csv','csv','header');

    myFont = loadFont('assets/Steelworks Vintage Demo.otf');
}

function setup() {
    var canvas = createCanvas(2*marginSlider+18*lineLength+17*xGap, 900);
    canvas.position(canvasX,canvasY);
    sortData();
}

function sortData(){
    //sort 1994-1997 (SIC)
    //sort 1998-2002(NAICS1997),2003-2007(NAICS2002),2008-2011(NAICS2007),2012-2015(NAICS2012)
    for(var i = 1998;i<=2015;i++){
        esTab[i]=table[i].getColumn("ESTAB");
        empSzes[i]=table[i].getColumn("EMPSZES");
        zipCode[i]=table[i].getColumn("zipcode");

        console.log("esTab["+i+"]=",esTab[i]);//problem from 1998 on. data not matching
        console.log("empSzes["+i+"]=",empSzes[i]);//problem from 1998 on.
    }
    for (i=1;i<=21;i++){
        neighZip = neighbourhood.getColumn("zip");
        neighName=neighbourhood.getColumn("name");
        }
}

function draw(){
    textFont(myFont);
    clear();
    background(230);
    var r=0,a=75; //r for colour red and blue, a for alpha
    var xPos=marginSlider,yPos=height - marginBase;
    var mouseYear;
    var strokeWeightCurrent = 1;
    var trendX=[],trendY=[];

    if(zipCurrent>0){
        push();
        fill(75);
        noStroke();
        textSize(28);
        textStyle(BOLD);
        textAlign(CENTER);
        text("Number of Tourism Businesses", width/2,50);//header
        text("1998 - 2015", width/2, 78);

        textSize(20);
        textStyle(NORMAL);
        for (var i = 0;i<=21;i++){//neighbourhood
            if(neighZip[i]===zipCurrent){
                text(neighName[i],width/2, 107);
            }
        }
        pop();

        push();// display zip
        fill(100);
        noStroke();
        textSize(20);
        textStyle(BOLD);
        textAlign(CENTER);
        text(zipCurrent,width/2,127);
        pop();

        r=240;//draw legend
        for( i = 0;i<=8;i++){
            noStroke();
            fill(color(r,r,94,240));// fill(color(c,90,130,240));
            rect(xPos+i*50,height - 55,8,8);
            r=r-25;
        }
        fill(105);
        push();
        textStyle(BOLD);
        textSize(15);
        text("business size (number of employees)",xPos-2,height-65);
        pop();
        textSize(12);
        text("1-4        5-9       10-19      20-49     50-99     100-249   250-499    500-999     1000+",xPos-2,height - 35);
    }

    //draw alpha
    for ( i = 1998;i<=2015;i++){
        trendX = [];
        trendY = [];
        r=0;
        longestStr=0;
        for(var n = 0;n<=esTab[i].length;n++){
            if (zipCode[i][n]===zipCurrent+']'){
                yPos=height -marginBase;
                for(var j = n+9;j>n;j--){//draw from the thickest; goes through 260-212
                    strokeWeight(strokeWeightCurrent);
                    stroke(color(r,r,94,a));
                    for (var k=0;k<esTab[i][j];k++){
                        line(xPos,yPos,xPos+lineLength,yPos);
                        yPos=yPos-strokeWeightCurrent;
                    }
                    r=r+25;
                    if(esTab[i][j]!==0){yPos=yPos-1;}
                }
                break;
            }
        }
        xPos= xPos + lineLength + xGap;
    }

    //draw solid
    yPos=height -marginBase;
    r=0;

    if(mouseX>marginSlider&&mouseX<width-marginSlider){
        mouseYear = Math.floor(map(mouseX,marginSlider, width-marginSlider-lineLength,1998,2015));
        for(n = 0;n<=esTab[mouseYear].length;n++){
            if (zipCode[mouseYear][n]===zipCurrent+']'){
                //var yPosMod=0;//Y Position Modifier
                for(j = n+9;j>n;j--){//goes through 260-212
                    strokeWeight(strokeWeightCurrent);
                    stroke(color(r,r,94));
                    textSize(15);
                    var yPosP=yPos;//previous yPos for for legend

                    for (k=0;k<esTab[mouseYear][j];k++){
                        xPos=marginSlider+(mouseYear-1998)*(lineLength+xGap);
                        line(xPos,yPos,xPos+lineLength,yPos);
                        if (Math.ceil(esTab[mouseYear][j]/2)===k){//display legend
                            var legendX=xPos+lineLength+2,legendY=yPos;

                            //draw leaders
                            push();
                            line(legendX,legendY,legendX+9,legendY);
                            legendX=legendX+9;

                            /*if (yPosP-legendY < 3&&counter!==0){//trying to space out tight legends
                                yPosMod=6+yPosMod;
                                console.log("yPosMod=",yPosMod);
                            }
*/
                            line(legendX,legendY,legendX,legendY-6);
                            legendY=legendY-6;

                            line(legendX,legendY,legendX+10,legendY);
                            legendX=legendX+10;
                            //draw legend box
                            fill(color(r,r,94));
                            noStroke();
                            rect(legendX+2,legendY-5,8,8);
                            //draw legend text
                            text(esTab[mouseYear][j],legendX+14, legendY+4);

                            pop();

                            yPosP=legendY;
                            //counter=1;
                        }
/*
                        push();
                        noFill();stroke(255);
                        beginShape();
                        for(var v=0;v<=mouseYear;v++){
                            curveVertex(trendX[mouseYear-1998],trendY[mouseYear-1998]);
                        }
                        console.log("trendX=",trendX);
                        console.log("trendY=",trendY);
                        endShape();
                        pop();
*/
                        yPos=yPos-strokeWeightCurrent;
                    }
                    r=r+25;
                    if(esTab[mouseYear][j]!==0){yPos=yPos-1;}

                }

                //draw pop-up chart
                push();
                noStroke();
                fill(240,240,240,190);

                rectMode(CORNERS);
                var popX,popY=300;
                if (mouseYear<2009){
                    popX=xPos+70;
                    rect(popX,popY,popX+120,popY+425);
                }
                else {
                    popX=xPos-130;
                    rect(popX,popY,popX+120,popY+425);
                }
                if(mouseYear>1998){
                    fill(75);

                    textStyle(BOLD);
                    text(mouseYear,popX+10,popY+20);
                    fill(100);
                    textStyle(NORMAL);
                    text("total",popX+10,popY+50);

                    text("most changed since last year",popX+10,popY+100);
                    text("most change since 1998",popX+10,popY+150);

                    var busTotal=0;
                    for (i=0;i<=esTab[mouseYear].length;i++){
                        if(empSzes[mouseYear][i]===1){
                            busTotal = busTotal+esTab[mouseYear][i];
                            console.log("busTotal=",busTotal);
                        }
                    }

                    text(busTotal,popX+10, popY+75);
                }

                pop();

/*                push();//display year
                noStroke();
                fill(135);
                translate(xPos,height-marginBase+30);
                rotate(-PI/5.0);
                textSize(15);
                text(mouseYear,0,0);
                pop();*/

                break;
            }
        }
    }
}

function drawData(e){
    strokeCap(SQUARE);
    zipCurrent=e.target.feature.properties.zip;
}

//-------------------LEAFLET CONTROL-----------------------------------------
var map = L.map('map').setView([36.1678467,-86.7975992],11);

L.tileLayer('https://api.mapbox.com/styles/v1/qychelsea/cj8uawbmy99052rmiuzyyjg7b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicXljaGVsc2VhIiwiYSI6ImNpcHFhZ3d3ODAwNXlod25wbDA2eWZta3IifQ.hEGkyGTCvHlqBm14G4pzxA', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.moonlight'
}).addTo(map);

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Nashville by ZIP Code</h4>' +  (props ?
        '<b>' + props.zip + '</b><br />'
        : 'Click to view area');
};

info.addTo(map);

function style(feature) {
    return {
        weight: 1.5,
        opacity: 1,
        color: '#666666',
        dashArray: 2,
        fillOpacity: 0.35,
        fillColor: '#ffe500'
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#555',
        dashArray: '',
        fillOpacity: 0.65
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click:drawData
    });
}

geojson = L.geoJson(nashvilleZipCodes, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('ZIP Code data &copy; <a href="https://data.nashville.gov/General-Government/Zip-Codes-GIS-/u7r5-bpku">Data.Nashville.gov</a>');

function testEvent(e){
    console.log("e=",e);
    console.log("e.target=",e.target);
    console.log("e.target.feature.properties",e.target.feature.properties);
    console.log("zip=",e.target.feature.properties.zip);
}

