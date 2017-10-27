var table = [];
var esTab = [],empSzes = [],zipCode=[];
var canvasX=605, canvasY = 0, marginSlider=100, marginBase=175;
var zipCurrent;
var mx;
var xGap=15;
var lineLength=10;

function preload(){
    for (var i = 1998; i<=2015; i++){
        table [i] = loadTable('data/zbp'+i+'.csv', 'csv', 'header');
    }
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
}

function draw(){
    clear();
    background('#e8e3e8');
    var c=0,a=75; //c for colour, a for alpha
    var xPos=marginSlider,yPos=height - marginBase;
    var mouseYear;
    var strokeWeightCurrent = 1;
    var trendX=[],trendY=[];

    if(zipCurrent>0){
        push();// display zip
        fill(100);
        noStroke();
        textSize(20);
        textStyle(NORMAL);
        textAlign(CENTER);
        text(zipCurrent,width/2,height-2*marginBase/3);
        pop();

        c=240;
        for(var i = 0;i<=8;i++){
            noStroke();
            fill(color(c,90,130,240));
            rect(xPos+i*50,height - marginBase/3,8,8);

            c=c-30;
        }
        fill(155);
        push();
        textStyle(BOLD);
        text("business size (employees)",xPos-2,height-65);
        pop();

        text("1-4          5-9         10-19       20-49     50-99     100-249   250-499  500-999  1000+",xPos-2,height - 35);

    }

    //draw alpha
    for ( i = 1998;i<=2015;i++){
        trendX = [];
        trendY = [];
        c=0;
        longestStr=0;
        for(var n = 0;n<=esTab[i].length;n++){
            if (zipCode[i][n]===zipCurrent+']'){
                yPos=height -marginBase;
                for(var j = n+9;j>n;j--){//draw from the thickest; goes through 260-212
                    strokeWeight(strokeWeightCurrent);
                    stroke(color(c,90,130,a));
                    for (var k=0;k<esTab[i][j];k++){
                        line(xPos,yPos,xPos+lineLength,yPos);
                        yPos=yPos-strokeWeightCurrent;
                    }
                    c=c+30;
                    if(esTab[i][j]!==0){yPos=yPos-1;}

                }
/*                trendX.push(xPos+lineLength/2);
                trendY.push(yPos-5);*/
                break;
            }
        }

        xPos= xPos + lineLength + xGap;

    }

    //draw solid
    yPos=height -marginBase;
    c=0;

    if(mouseX>marginSlider&&mouseX<width-marginSlider){
        mouseYear = Math.floor(map(mouseX,marginSlider, width-marginSlider-lineLength,1998,2015));
        for(n = 0;n<=esTab[mouseYear].length;n++){
            if (zipCode[mouseYear][n]===zipCurrent+']'){
                for(j = n+9;j>n;j--){//draw from the thickest; goes through 260-212
                    strokeWeight(strokeWeightCurrent);
                    stroke(color(c,90,130));
                    for (k=0;k<esTab[mouseYear][j];k++){
                        xPos=marginSlider+(mouseYear-1998)*(lineLength+xGap);
                        line(xPos,yPos,xPos+lineLength,yPos);
                        if (Math.ceil(esTab[mouseYear][j]/2)===k){//display legend
                            var legendX=xPos+lineLength+2,legendY=yPos;
                            //draw leaders
                            push();
                            line(legendX,legendY,legendX+9,legendY);
                            legendX=legendX+9;

                            line(legendX,legendY,legendX,legendY-6);
                            legendY=legendY-6;

                            line(legendX,legendY,legendX+10,legendY);
                            legendX=legendX+10;
                            //draw legend box
                            fill(color(c,90,130));
                            noStroke();
                            rect(legendX+2,legendY-5,8,8);
                            //draw legend text
                            text(esTab[mouseYear][j],legendX+14, legendY+4);

                            pop();
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
                    c=c+30;
                    if(esTab[mouseYear][j]!==0){yPos=yPos-1;}
                }
                push();//display year
                noStroke();
                fill(135);
                translate(xPos,height-marginBase+30);
                rotate(-PI/5.0);
                text(mouseYear,0,0);
                pop();

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
        fillColor: '#a385ad'
        //ff99cc (pink),527a7a9(purple grey),52527a(green grey),a385ad,ff99cc
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

