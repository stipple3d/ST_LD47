class Ball{
	constructor(_x, _y, _speed, _radius){
		this.pos = new Vector2D(_x, _y);
		this.speed = _speed;
		this.radius = _radius;

		this.vel = new Vector2D();
	}

	update = function(_dt){
		this.pos.x += this.vel.x * _dt;
		this.pos.y += this.vel.y * _dt;
	}

	addForce = function(_x, _y){
		//adds force to the current velocity
		this.vel.x += _x;
		this.vel.y += _y;

		//TODO: contrain this and check magnitude to be EQUAL to the target speed
		this.vel.setMag(this.speed);
	}

	setVelocity = function(_x, _y){
		//overwrites the current velocity with the incoming values
		this.vel.x = _x;
		this.vel.y = _y;
	}

	draw = function(){
		context.save();

		//DRAW BALL
		context.beginPath();
		context.fillStyle = '#999';
		context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI *2);
		context.fill();

		context.restore();
	}
}