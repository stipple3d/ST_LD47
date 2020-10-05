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

		//console.log(this.radius);
		//bounce off the sides
		if(this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= canvas.width)
			this.vel.x *= -1;
		//bounce of the top?
		if(this.pos.y - this.radius <= 0)
			this.vel.y *= -1;
		else if(this.pos.y > canvas.height){

			//BALL HAS GONE OFF THE BOTTOM OF THE SCREEN = LOST LIFE

			//for now, bounce off the bottom too...
			this.vel.y *= -1;
		}
	}

	addForce = function(_x, _y){
		//adds force to the current velocity
		this.vel.x += _x;
		this.vel.y += _y;

		//contrain this and check magnitude to be EQUAL to the target speed
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