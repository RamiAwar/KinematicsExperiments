class Segment {

	constructor(x, y, len_, angle_, color_, shadow_color_){

		this.a = createVector(x, y);
		this.angle = angle_;
		this.len = len_;
		this.parent = null;
		this.color = color_;
		this.shadow_color = shadow_color_;

	}

	setConstraints(centerAngle, rotationRange){
		this.rotation_range = rotationRange;
		this.center_angle = centerAngle;
	}

	 setPhase(){
	 	this.angle = this.centerAn
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
		// console.log(ty);
	}

	show(){
		stroke(this.color);
		strokeWeight(4);
		line(this.a.x, this.a.y, this.b.x, this.b.y);
	}

	drawEnd(){
	
		pg.stroke(this.shadow_color);
		pg.strokeWeight(1);
		pg.point(this.b.x, this.b.y);
	
	}

}

class FKSystem {


	constructor(x, y){
		this.x = x;
		this.y = y;
		this.segments = [];
	}

	addSegment(length, angle){
		var segment = new Segment(this.x, this.y, length, angle, "#00FF00", "#00FFFF");
		this.segments.push(segment);
		// check if previous arms exist
		if(this.lastSegment){
			segment.parent = this.lastSegment;
		}
		this.lastSegment = segment; // make current segment parent of future arms
	}

	update(){
		for(var i = 0; i < this.segments.length; i++){
			var segment = this.segments[i];
			segment.update();
		}
	}

	render(){
		for(var i = 0; i < this.segments.length; i++){
			var segment = this.segments[i];
			segment.show();
		}	
	}

}