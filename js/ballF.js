class Ball{
	constructor(_x, _y, _speed, _radius){
		this.pos = new Vector2D(_x, _y);
		this.speed = _speed;
		this.radius = _radius;

		this.vel = new Vector2D();
	}

	update = function(_dt){

	}

	addForce = function(_x, _y){
		//adds force to the current velocity
	}

	setVelocity = function(_x, _y){
		//overwrites the current velocity with the incoming values
	}

	draw = function(){
		
	}
}