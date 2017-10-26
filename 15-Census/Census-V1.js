var table = [];
var esTab = [],empSzes = [],zipCode=[];
var colour212,colour220,colour230,colour241,colour242,colour251,colour252,colour254,colour260;
var canvasX=605,canvasY = 0,marginSlider=200;
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
    var canvas = createCanvas(1250, 900);
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

function drawData(e){
    //if (eventCount==0){drawSlider();eventCount=1;}
    clear();
    background('#e8e3e8');
    var xPos=marginSlider,yPos=height -150,yGap=1;

    var longestStr;
    var c,a=75;//c for colour, a for alpha

    strokeCap(SQUARE);
/*  //from before; draw all; original set xPos=50,yPos=100,xGap=50,yGap=1;
    for(var i = 1998;i<=2015;i++){
        stroke(c);
        longestStr=0;
        for(var n = 0;n<=esTab[i].length;n++){
            if (empSzes[i][n]==1) {
                xPos = xPos + lineLength + 5;
                yPos = 100;
                /!*if (longestStr<esTab[i][n]) {
                    console.log("i=",i,"n=",n,"esTab[i][n]=",esTab[i][n],"empSzes[i][n]=",empSzes[i][n],"old longest string=",longestStr);
                    longestStr = esTab[i][n];
                    console.log("new longest string=", longestStr);
                }*!/  //longest string tracking not working
            }
            if (empSzes[i][n]!=1){
                //console.log("i=",i,"n=",n,"esTab[i][n]=",esTab[i][n],"empSzes[i][n]=",empSzes[i][n],",yPos=",yPos,"xPos=",xPos,"colour=",c);
                for (var j=0;j<esTab[i][n];j++){
                    //stroke(colour(empSzes[i][n]));
                    line(xPos,yPos,xPos+lineLength,yPos);
                    yPos=yPos+2;
                }
            }

        }
        c=c-30;
    }
    yPos=longestStr+50;*/

    zipCurrent=e.target.feature.properties.zip;
    console.log("zipCurrent=",zipCurrent);

    for (var i = 1998;i<=2015;i++){
        c=0;
        var strokeWeightCurrent = 1;
        longestStr=0;
        for(var n = 0;n<=esTab[i].length;n++){
            if (zipCode[i][n]===zipCurrent+']'){
                yPos=height -150;
                for(var j = n+9;j>n;j--){//draw from the thickest; goes through 260-212
                    strokeWeight(strokeWeightCurrent);
                    stroke(color(c,90,130,a));
                    console.log("xPos=",xPos," yPos=",yPos);
                    for (var k=0;k<esTab[i][j];k++){
                        line(xPos,yPos,xPos+lineLength,yPos);
                        yPos=yPos-strokeWeightCurrent-1;
                    }
                    c=c+30;
                }
                console.log("---");
            break;
            }
        }
        xPos= xPos + lineLength + xGap;
    }


/*    // SLIDER LABELS
    n=-6;
    for(i=1998;i<=2015; i++){
        fill(75);
        strokeWeight(1);
        push();
        translate(marginSlider+n,height-55);
        //rotate(PI/5.0);
        text(i,0,0);
        n=(width - 2*marginSlider)/17+n;
        pop();
    }*/

}

function draw(){
    if(mouseX>marginSlider&&mouseX<width-17*lineLength+16*xGap){
        drawCurrent(mouseX);
    }
}

function drawCurrent(mx){
    var c=0;
    var lineLength=10;
    var xPos=marginSlider,yPos=height -150;
    var mouseYear = Math.floor(map(mx,marginSlider, 635,1998,2015));
    console.log("mouseYear=",mouseYear,"winMouseX=",mouseX);

    var strokeWeightCurrent = 1;

    for(var n = 0;n<=esTab[mouseYear].length;n++){
        if (zipCode[mouseYear][n]===zipCurrent+']'){
            for(var j = n+9;j>n;j--){//draw from the thickest; goes through 260-212
                strokeWeight(strokeWeightCurrent);
                stroke(color(c,90,130));
                for (var k=0;k<esTab[mouseYear][j];k++){
                    line(xPos,yPos,xPos+lineLength,yPos);
                    yPos=yPos-strokeWeightCurrent-1;
                }
                c=c+30;
            }
            break;
        }
    }
}
/*function drawSlider(){
    var slider;
    slider = createSlider(1998,2015,1998);
    slider.position(canvasX+marginSlider, height-100);
    slider.style('width', '850px');
}*/

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


// get color depending on population density value
function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
                d > 100  ? '#FC4E2A' :
                    d > 50   ? '#FD8D3C' :
                        d > 20   ? '#FEB24C' :
                            d > 10   ? '#FED976' :
                                '#FFEDA0';
}

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

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
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

