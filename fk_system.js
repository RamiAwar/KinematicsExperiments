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
		this.max_iterations = 10;
		this.delta_threshold = 
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

		// First case if target is unreachable
		if(diff.mag() >= this.max_length){

			var direction = createVector(x, y).sub(this.base);
			for(var i = 0; i < this.segments.length; i++){

				this.segments[i].angle = direction.heading();
				this.segments[i].update(false);
			}

		}else{

			for(var iteration = 0; iteration < this.max_iterations; iteration++){

				// back
				for(var i = this.segments.length - 1; i >= 0; i--){
					
					if( i == this.segments.length - 1){
						this.segments[i].b = target;
					}else{
						this.segments[i].b = this.segments[i+1].a;
					}

					if(i != 0){
						var direction = this.segments[i].b.copy().sub(this.segments[i-1].b).normalize();
						this.segments[i].a = this.segments[i].b.copy().sub(direction.mult(this.segments[i].length));
					}else{
						var direction = this.segments[i].b.copy().sub(this.base).normalize();
						this.segments[i].a = this.segments[i].b.copy().sub(direction.mult(this.segments[i].length));
					}
				}

				// forward
				for(var i = 0; i < this.segments.length; i++){
					if(i == 0){
						this.segments[0].a = this.base;
					}else{
						this.segments[i].a = this.segments[i-1].b;
					}

					var direction = this.segments[i].b.copy().sub(this.segments[i].a).normalize();
					this.segments[i].b = this.segments[i].a.copy().add(direction.mult(this.segments[i].length));

				}

				// check if close enough
				if( this.segments[this.segments.length - 1].b.copy().sub(target).mag() < this.delta_threshold){
					break;
				}


			}

			
			
			
		}

	}

	render(){

		for(var i = 0; i < this.segments.length; i++){
			var segment = this.segments[i];
			segment.show();
		}

	}

}