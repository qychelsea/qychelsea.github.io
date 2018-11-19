var i, target, target2, item, img=[];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    item = $(".essayitem");
    for (i = 0; i < item.length; i++) {
        target = Math.floor(Math.random() * item.length - 1) + 1;
        target2 = Math.floor(Math.random() * item.length - 1) + 1;
        item.eq(target).before(item.eq(target2));
    }
}

/*function preload(){

    img[1] = loadImage('/images/essay/night1.jpg');

    text("load successful");
}
function draw(){
    background(10);
    fill(255);
    //text("length of essayitem="+item, width/2,height/2);
    for(i=1;i<=7;i++){
        imageMode(LEFT);
        image(img['night'+i]);
    }

}