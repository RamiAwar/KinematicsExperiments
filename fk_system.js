class Segment {

	constructor(x, y, len_, angle_, color_, shadow_color_){

		this.a = createVector(x, y);
		this.b = this.a.copy().add(createVector(this.length, 0));
		this.angle = angle_;
		this.length = len_;
		this.parent = null;
		this.color = color_;
		this.shadow_color = shadow_color_;

	}

	setConstraints(centerAngle, rotationRange){
		this.rotation_range = rotationRange;
		this.center_angle = centerAngle;
	}


	calculateEnd(parent=true){
		
		// sum all angles across all parents
		var angle = this.angle;
		if(parent){
			var parent = this.parent;
			while(parent){
				angle += parent.angle;
				parent = parent.parent;
			}
		}

		var dx = this.length * cos(angle);
		var dy = this.length * sin(angle);
		this.b = createVector(this.a.x + dx, this.a.y + dy);
	}



	update(parent=true){

		if(this.parent){
			this.a = this.parent.b;
		}

		this.calculateEnd(parent);
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
		
		this.base = createVector(x,y);
		this.segments = [];
	}

	addSegment(length, angle){
		
		var segment = new Segment(this.base.x, this.base.y, length, angle, "#00FF00", "#00FFFF");
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

class IKSystem {


	constructor(x, y){
		
		this.base = createVector(x,y);
		this.segments = [];
		this.max_length = 0;
		this.max_iterations = 100;
	}

	addSegment(length, angle){
		
		var segment = new Segment(this.base.x, this.base.y, length, angle, "#00FF00", "#00FFFF");
		this.segments.push(segment);

		// check if previous arms exist
		if(this.lastSegment){
			segment.parent = this.lastSegment;
		}

		this.lastSegment = segment; // make current segment parent of future arms

		this.max_length += segment.length;
		
	}

	update(x, y){
		
		var target = createVector(x, y);
		var diff = target.copy().sub(this.base);


		if(diff.mag() > this.max_length){
			var direction = createVector(x, y).sub(this.base);
			for(var i = 0; i < this.segments.length; i++){
				this.segments[i].update(false);
				this.segments[i].angle = direction.heading();
			}

		}else{

			for(var iteration = 0; iteration < this.max_iterations; iteration++){

				// back
				for(var i = this.segments.length - 1; i > 0; i--){
					if( i == this.segments.length - 1){
						this.segments[i].b = target;
					}else{
						this.segments[i].b = this.segments[i+1].b.copy().add(this.segments[i].b.copy().sub(this.segments[i+1].b.copy())).normalize().mult(this.segments[i].length);
					}
				}

				// forward
				for(var i = 1; i < this.segments.length; i++){
					this.segments[i].b = this.segments[i-1].b.copy().add(this.segments[i].b.copy().sub(this.segments[i-1].b.copy())).normalize().mult(this.segments[i-1].length);
				}

				// check if close enough
				console.log(this.segments[this.segments.length - 1].b);
				if( this.segments[this.segments.length - 1].b.copy().sub(target).mag() < 1){
					break;
				}

				console.log(iteration);

			}

			// for(var i = 0; i < this.segments.length; i++){
			// 	this.segments[i].update(false);
			// }
			
			
		}

	}

	render(){

		for(var i = 0; i < this.segments.length; i++){
			var segment = this.segments[i];
			segment.show();
		}

	}

}