var table = [];
var esTab = [],empSzes = [],zipCode = [];
var colour212,colour220,colour230,colour241,colour242,colour251,colour252,colour254,colour260;

var map = L.map('map').setView([36.188574, -86.775464],11);

L.tileLayer('https://api.mapbox.com/styles/v1/qychelsea/cj8uawbmy99052rmiuzyyjg7b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicXljaGVsc2VhIiwiYSI6ImNpcHFhZ3d3ODAwNXlod25wbDA2eWZta3IifQ.hEGkyGTCvHlqBm14G4pzxA', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.moonlight'
}).addTo(map);

//MapBox Token
//pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw


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
    //sort 1998-2002(NAICS1997),2003-2007(NAICS2002),2008-2011(NAICS2007),2012-2015(NAICS2012)
    for(var i = 1994;i<=2015;i++){
        esTab[i]=table[i].getColumn("ESTAB");
        empSzes[i]=table[i].getColumn("EMPSZES");
        //zipCode[i]=table[i].getColumn("zipcode");
        console.log("esTab["+i+"]=",esTab[i]);//problem from 1998 on. data not matching
        console.log("empSzes["+i+"]=",empSzes[i]);//problem from 1998 on.
    }

    drawData();
}

function drawData(){
    var xPos=50,yPos=100,xGap=50,yGap=1;
    var lineLength=10;
    var longestStr;
    var c=190;
    stroke(c);
    for(var i = 1998;i<=2015;i++){
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
                for (var j=0;j<esTab[i][n];j++){
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

//-------------------LEAFLET CONTROL-----------------------------------------
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
        : 'Hover over to view area');
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
        fillColor: '#ff99cc'
        //fillColor: getColor(feature.properties.density)
        //ff99cc (pink),527a7a9(purple grey),52527a(green grey)
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
        click: zoomToFeature
    });
}

geojson = L.geoJson(nashvilleZipCodes, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('ZIP Code data &copy; <a href="https://data.nashville.gov/General-Government/Zip-Codes-GIS-/u7r5-bpku">Data.Nashville.gov</a>');


var legend = L.control({position: 'bottomright'});

/*legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};*/

//legend.addTo(map);