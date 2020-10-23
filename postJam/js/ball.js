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
		if(this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= canvas.width){
			this.vel.x *= -1;
			wallBounceA.play();
		}
		//bounce of the top?
		if(this.pos.y - this.radius <= 0){
			this.vel.y *= -1;
			wallBounceA.play();
		}
		/*else if(this.pos.y > canvas.height){

			//BALL HAS GONE OFF THE BOTTOM OF THE SCREEN = LOST LIFE
			//game.removeBall(this);
		}*/
		else if(this.vel.y > 0 &&
				this.pos.x >= game.paddlePos.x - game.paddleWidth /2 && 
				this.pos.x <= game.paddlePos.x + game.paddleWidth /2 &&
				this.pos.y + this.radius >= game.paddlePos.y){
			//collided with paddle, reverse Y vel
			bounceSoundA.play();
			//this.pos.y = game.paddlePos.y - game.paddleHeight/2 - this.height/2;
			this.vel.y *= -1;

			//and add a adjustment if the paddle was moving this frame
			if(game.paddleChangeX != 0){
				this.addForce(game.paddleChangeX * 10, 0);
			}
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