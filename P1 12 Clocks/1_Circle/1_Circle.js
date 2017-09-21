function setup() {
  createCanvas(640, 640);
  background(255,130,175);
}


function draw(){
	background(255,130,175);
	rect(20,20,200,500);
	fill(255,0,0);
	ellipse(xPos,50,100,100);

	xPos = xPos + 5;
}

