

class Segment {

	constructor(x, y, len_, angle_, color_, shadow_color_){

		this.a = createVector(x, y);
		this.angle = angle_;
		this.len = len_;
		this.parent = null;
		this.color = color_;
		this.shadow_color = shadow_color_;

	}

	calculateEnd(){
		
		// sum all angles across all parents
		var angle = this.angle;
		var parent = this.parent;
		while(parent){
			angle += parent.angle;
			parent = parent.parent;
		}

		var dx = this.len * cos(angle);
		var dy = this.len * sin(angle);
		this.b = createVector(this.a.x + dx, this.a.y + dy);
	}

	update(){

		if(this.parent){
			this.a = this.parent.b;
		}

		this.calculateEnd();
	}

	follow(tx, ty){
		var dir = createVector(tx, ty);
		dir.sub(this.a);
		this.angle = dir.heading();
		console.log(ty);
	}

	show(){
		stroke(this.color);
		strokeWeight(4);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}

	drawEnd(){
	
		pg.stroke(this.shadow_color);
		pg.strokeWeight(2);
		pg.point(this.b.x, this.b.y);
	
	}

}




var s1;
var s2;
var s3, s4, s5;
var angle = 0;


function setup(){

	createCanvas(600, 600);
	pg = createGraphics(600, 600);

	s1 = new Segment(300, 300, 100, 0, "#00FF00", "#00FFFF");
	s2 = new Segment(400, 200, 100, 1, "#FF00FF", "#00FFFF");
	s2.parent = s1;
	s3 = new Segment(300, 100, 50, 1, "#FFFF00", "#FFFF00");
	s3.parent = s2;

	s4 = new Segment(300, 100, 50, 2, "#00FFFF", "#00FFFF");
	s4.parent = s2;

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

	s1.angle = angle*0.1 + sin(angle*0.4)*cos(angle*0.4);
	s2.angle = cos(angle*0.6)*2;
	s3.angle = angle*0.07 + cos(-angle*0.5);
	s4.angle = angle*0.1 + sin(angle*0.2);

	// s2.follow(cos(angle*0.3), sin(angle*0.2));
	// s3.follow(cos(angle*0.1), sin(angle*0.1));
	
	s1.update();
	s2.update();
	s3.update();
	s4.update();

	s3.drawEnd();
	s4.drawEnd();

	// push();
	image(pg, 0, 0);

	s1.show();
	s2.show();
	s3.show();
	s4.show();


	angle += 0.05;


}