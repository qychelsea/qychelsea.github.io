function testEvent(e){
    console.log(e);
    console.log(e.target);
    console.log(e.target.feature.properties);
    console.log(e.target.feature.properties.zip);
}

function onEachFeature(feature,layer){
    layer.on({
        mouseover:highlightFeature,
        mouseout:resetHighlight,
        click:testEvent
    });
}