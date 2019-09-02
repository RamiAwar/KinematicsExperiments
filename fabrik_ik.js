
var angle = 0;

function setup(){

	createCanvas(600, 600);
	pg = createGraphics(600, 600);


	ik_system = new IKSystem(width/2, height/2);
	ik_system.addSegment(100, 0);
	ik_system.addSegment(100, 0);
	// ik_system.addSegment(50, 0);
	// ik_system.addSegment(20, 0);

	background("#A44DE8");
	pg.background("#A44DE8");

}

function draw(){
	
	background("#A44DE8");


	// ik_system.segments[0].angle = angle*0.06;
	// ik_system.segments[1].angle = angle*0.055;
	


	ik_system.update(mouseX, mouseY);


	image(pg, 0, 0);


	ik_system.render();





}