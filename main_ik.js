class Segment {

	constructor(x, y, len_, angle_, color_){

		this.a = createVector(x, y);
		this.angle = angle_;
		this.len = len_;
		this.parent = null;
		this.color = color_;

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

}

var points = [];

function drawShadow(point_){
	points.push(point_);
	for(p of points){
		stroke("#00FFFF");
		strokeWeight(2);
		point(p.x, p.y);
	}
}

var s1;
var s2;
var s3;
var angle = 0;


function setup(){

	createCanvas(600, 600);

	s1 = new Segment(300, 300, 100, 0, "#00FF00");
	s2 = new Segment(400, 200, 100, 1, "#FF00FF");
	s2.parent = s1;
	s3 = new Segment(300, 100, 50, 1, "#FFFF00");
	s3.parent = s2;
}

function draw(){

	background("#A44DE8");
	s1.angle = cos(angle*0.3)*1.3;
	s2.angle = cos(angle*0.1)*2;
	s3.angle = sin(angle*0.4)*1.2;

	// s2.follow(cos(angle*0.3), sin(angle*0.2));
	// s3.follow(cos(angle*0.1), sin(angle*0.1));
	
	s1.update();
	s2.update();
	s3.update();
	s1.show();
	s2.show();
	s3.show();
	drawShadow(s3.b);

	angle += 0.1;


}