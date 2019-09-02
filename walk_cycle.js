
var angle = 0;

function setup(){

	createCanvas(600, 600);
	pg = createGraphics(600, 600);


	fk_system = new FKSystem(width/2, height/2);
	fk_system.addSegment(100, 0);
	fk_system.addSegment(100, 1);
	fk_system.addSegment(50, 2);
	fk_system.addSegment(20, -1);

	// s1 = new Segment(300, 300, 100, 0, "#00FF00", "#00FFFF");
	// s2 = new Segment(400, 200, 100, 1, "#FF00FF", "#00FFFF");
	// s2.parent = s1;
	// s3 = new Segment(300, 100, 50, 1, "#FFFF00", "#FFFF00");
	// s3.parent = s2;

	// s4 = new Segment(300, 100, 50, 2, "#00FFFF", "#00FFFF");
	// s4.parent = s2;

	background("#A44DE8");
	pg.background("#A44DE8");

}

function draw(){
	
	background("#A44DE8");

	// s1.angle = cos(angle*0.3)*1.3;
	// s2.angle = cos(angle*0.1)*2;
	// s3.angle = sin(angle*0.4)*1.2;

	// s1.angle = cos(angle*0.1)*1.3;
	// s2.angle = cos(angle*0.1)*2;
	// s3.angle = sin(angle*0.4)*1.2;
	// s4.angle = sin(angle*0.2)*1.5;

	// necklace
	// s1.angle = (angle*0.1);
	// s2.angle = cos(angle*0.1)*2;
	// s3.angle = sin(angle*0.4)*1.2;
	// s4.angle = sin(angle*0.2)*1.5;

	fk_system.segments[0].angle = angle*0.03;
	fk_system.segments[1].angle = angle*0.0399;
	
	// fk_system.segments[2].angle = angle*0.06;
	// fk_system.segments[3].angle = angle*0.04;

	// s2.follow(cos(angle*0.3), sin(angle*0.2));
	// s3.follow(cos(angle*0.1), sin(angle*0.1));
	
	// s1.update();
	// s2.update();
	// s3.update();
	// s4.update();

	fk_system.update();

	fk_system.segments[0].drawEnd();
	fk_system.segments[1].drawEnd();
	// s3.drawEnd();
	// s4.drawEnd();

	image(pg, 0, 0);

	// s1.show();
	// s2.show();
	// s3.show();
	// s4.show();
	// fk_system.render();

	angle += 0.8;


}