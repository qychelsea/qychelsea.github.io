var table = []; neighbourhood = [];
var esTab = [],empSzes = [],zipCode=[],neighZip = [], neighName=[];
var canvasX=605, canvasY = 0, marginSlider=100, marginBase=150;
var zipCurrent;
var counter=0;
var xGap=15;
var lineLength=10;
var deltaGain, deltaGainCat, deltaLoss=0,deltaLossCat, deltaTtl,deltaTtlP; //most changed since last year (category), since 1998, Overall (percentage)
var myFont,bgImg;

function preload(){
    for (var i = 1998; i<=2015; i++){
        table [i] = loadTable('data/zbp'+i+'.csv', 'csv', 'header');
    }
    neighbourhood = loadTable('data/Neighbourhood.csv','csv','header');
    myFont = loadFont('assets/Steelworks Vintage Demo.otf');
    bgImg = loadImage('assets/vintageBackground.jpg');
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
    }
    for (i=1;i<=21;i++){
        neighZip = neighbourhood.getColumn("zip");
        neighName=neighbourhood.getColumn("name");
        }
}

function draw(){
    textFont(myFont);
    clear();
    background(249, 242, 236);//235
    tint(255,110);
    image(bgImg, 0,0, bgImg.width, bgImg.height);
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

        r=0;//draw horizontal legend
        for( i = 0;i<=8;i++){
            noStroke();
            fill(color(r,r,94,240));// fill(color(c,90,130,240));
            rect(width-marginSlider-i*54-4,height - 55,8,8);
            r=r+25;
        }
        fill(105);
        push();
        textStyle(BOLD);
        textSize(15);
        text("business size (number of employees)",xPos-2,height-65);
        pop();
        textSize(12);
        text("1-4        5-9        10-19      20-49     50-99       100-249    250-499     500-999     1000+",xPos-2,height - 35);
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
                for(var j = n+9;j>n;j--){//draw from the darkest; goes through 260-212
                    if (esTab[i][j]!==0){
                        strokeWeight(strokeWeightCurrent);
                        stroke(color(r,r,94,a));
                        for (var k=0;k<esTab[i][j];k++){
                            line(xPos,yPos,xPos+lineLength,yPos);
                            yPos=yPos-strokeWeightCurrent;
                        }
                        r=r+25;
                        if(esTab[i][j]!==0){yPos=yPos-1;}
                    }
                    else {
                        r=r+25;
                        yPos=yPos+1;
                    }
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
                deltaGain=-1;
                deltaLoss=-1;
                deltaGainCat='none';
                deltaLossCat='none';
                var yPosP=height;//previous yPos for for legend

                for(j = n+9;j>n;j--){//goes through 260-212
                    strokeWeight(strokeWeightCurrent);
                    stroke(color(r,r,94));
                    textSize(15);

                    //calculate change
                    if(mouseYear>1998){
                        if (esTab[mouseYear][j]-esTab[mouseYear-1][j]>0&&esTab[mouseYear][j]-esTab[mouseYear-1][j]>deltaGain){
                            deltaGain=esTab[mouseYear][j]-esTab[mouseYear-1][j];
                            if(empSzes[mouseYear][j]=='212'){deltaGainCat='1-4';}
                            if(empSzes[mouseYear][j]=='220'){deltaGainCat='5-9';}
                            if(empSzes[mouseYear][j]=='230'){deltaGainCat='10-19';}
                            if(empSzes[mouseYear][j]=='241'){deltaGainCat='20-49';}
                            if(empSzes[mouseYear][j]=='242'){deltaGainCat='50-99';}
                            if(empSzes[mouseYear][j]=='251'){deltaGainCat='100-249';}
                            if(empSzes[mouseYear][j]=='252'){deltaGainCat='250-499';}
                            if(empSzes[mouseYear][j]=='254'){deltaGainCat='500-999';}
                            if(empSzes[mouseYear][j]=='260'){deltaGainCat='1000+';}
                           }
                        else if (esTab[mouseYear][j]-esTab[mouseYear-1][j]<0&&esTab[mouseYear-1][j]-esTab[mouseYear][j]>deltaLoss){
                            deltaLoss=esTab[mouseYear-1][j]-esTab[mouseYear][j];
                            if(empSzes[mouseYear][j]=='212'){deltaLossCat='1-4';}
                            if(empSzes[mouseYear][j]=='220'){deltaLossCat='5-9';}
                            if(empSzes[mouseYear][j]=='230'){deltaLossCat='10-19';}
                            if(empSzes[mouseYear][j]=='241'){deltaLossCat='20-49';}
                            if(empSzes[mouseYear][j]=='242'){deltaLossCat='50-99';}
                            if(empSzes[mouseYear][j]=='251'){deltaLossCat='100-249';}
                            if(empSzes[mouseYear][j]=='252'){deltaLossCat='250-499';}
                            if(empSzes[mouseYear][j]=='254'){deltaLossCat='500-999';}
                            if(empSzes[mouseYear][j]=='260'){deltaLossCat='1000+';}
                            }
                        else if (esTab[mouseYear][j]-esTab[mouseYear-1][j]===0){
                            deltaLoss=0;
                            deltaGain=0;
                        }
                    }

                    for (k=0;k<esTab[mouseYear][j];k++){
                        xPos=marginSlider+(mouseYear-1998)*(lineLength+xGap);
                        line(xPos,yPos,xPos+lineLength,yPos);

                        if (Math.floor(esTab[mouseYear][j]/2)===k&&esTab[mouseYear][j]!==0){//display vertical legend
                            var legendX=xPos+lineLength+2,legendY=yPos;
                            var yPosMod=0;

                            //draw leaders
                            push();
                            line(legendX,legendY,legendX+9,legendY);
                            legendX=legendX+9;

                            if (yPosP-legendY < 8){//space out tight legends
                                yPosMod=8-(yPosP-legendY);
                            }

                            line(legendX,legendY,legendX,legendY-3-yPosMod);
                            yPosP=legendY-3-yPosMod;
                            legendY=legendY-3-yPosMod;

                            line(legendX,legendY,legendX+10,legendY);
                            legendX=legendX+10;
                            //draw legend box
                            fill(color(r,r,94));
                            noStroke();
                            rect(legendX+2,legendY-5,8,8);
                            //draw legend text
                            text(esTab[mouseYear][j],legendX+14, legendY+4);
                            counter=1;
                            pop();
                         }
                         yPos=yPos-strokeWeightCurrent;
                    }
                    r=r+25;
                    if(esTab[mouseYear][j]!==0){yPos=yPos-1;}
                }

                //draw pop-up chart
                push();
                noStroke();
                fill(255, 248, 242,235);

                rectMode(CORNERS);
                var popX,popY,popYBase;
                if (yPos>450){
                    popY=450;
                    popYBase=height-marginBase;
                } else {
                    popY = yPos;
                    popYBase = popY+300;
                }
                if (mouseYear<2009){
                    popX=xPos+70;
                    rect(popX,popY,popX+130,popYBase);
                }
                else {
                    popX=xPos-130;
                    rect(popX,popY,popX+130,popYBase);
                }
                if(mouseYear>=1998){
                    fill(75);

                    textStyle(BOLD);
                    textSize(20);
                    text(mouseYear,popX+10,popY+25);
                    stroke(75);
                    line(popX+10,popY+28,popX+41,popY+28);

                    noStroke();
                    textSize(15);
                    fill(100);

                    text("total",popX+10,popY+55);
                    textStyle(NORMAL);
                    for (i=0;i<=esTab[mouseYear].length;i++){
                        if(zipCode[mouseYear][i]===zipCurrent+']'){
                            text(esTab[mouseYear][i], popX+10, popY+70);
                            if (mouseYear>1998){
                                deltaTtl=esTab[mouseYear][i]-esTab[mouseYear-1][i];
                                deltaTtlP=(esTab[mouseYear][i]-esTab[mouseYear-1][i])*100/esTab[mouseYear-1][i];
                                deltaTtlP=deltaTtlP.toFixed(2);
                            }
                            break;
                        }
                    }
                    if (mouseYear>1998){
                        if (deltaTtl>0){text("total annual gain",popX+10,popY+105);fill(102, 153, 0);}
                        if (deltaTtl<0){text("total annual loss",popX+10,popY+105);fill(153,51,51);}
                        if (deltaTtl===0){text("total annual change",popX+10,popY+105);fill(102, 153, 0);}
                        text(Math.abs(deltaTtl)+" firm(s) ("+deltaTtlP+"%)",popX+10,popY+120);

                        fill(102, 153, 0);
                        if(deltaGain>0){
                            text(deltaGainCat + " employee firms",popX+10,popY+170);
                            text("gains "+deltaGain  + " firm(s)",popX+10,popY+185);
                        }

                        if (deltaGain===0){
                            text("-",popX+10,popY+170);
                        }

                        fill(153,51,51);
                        if (deltaLoss>0){
                            text(deltaLossCat + " employee firms",popX+10,popY+235);
                            text("losses "+deltaLoss + " firm(s)",popX+10,popY+250);
                        }

                        if (deltaLoss===0){
                            text("-",popX+10,popY+235);
                        }

                        fill(100);
                        text("most gain",popX+10,popY+155);
                        text("most loss",popX+10,popY+220);
                    }
                }
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
        fillOpacity: 0.15,
        fillColor: '#ffe500'
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#555',
        dashArray: '',
        fillOpacity: 0.5
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