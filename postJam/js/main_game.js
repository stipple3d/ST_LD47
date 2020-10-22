class Game{
	constructor(_level = 0){

	//***** GENERAL

		this.levelIndex = _level;

	//***** BALLS

		//TODO: pull this in from the level data
		//		(and make sure everything draws accordingly)
		this.ballRadius = 10;

		//SINGLE BALL SPEED? (for the level)
		//(pixels per second)
		this.ballSpeed = levels[this.levelIndex].ballSpeed;

		//ball OBJECT array
		this.ballsInPlay = [];

		//simple count (will include when the balls go into shoots)
		this.ballCount = 0;

		//TEST: add a ball headed toward one of the collection points
		//var ball = new Ball(120, 300, this.ballSpeed, this.ballRadius);
		//ball.setVelocity(0,-this.ballSpeed);
		//this.ballsInPlay.push(ball);

	//***** LOOPSHOOTS

		//loopShoot(s) array
		this.loopShoots = [];

		//populate the array from the data
		for(var s = 0; s < levels[this.levelIndex].loopshoots.length; s++){
			//just pass in the level and the LoopShoot's index 
			//and it will pull the rest from data
			this.loopShoots[s] = new LoopShoot(this.levelIndex, s, this.ballRadius, this.ballSpeed);
		}

		//add number of balls requested to random loopShoot QUEs
		/*for(var b = 0; b < levels[this.levelIndex].ballsToStart; b++){
			this.loopShoots[Math.floor(Math.random() * this.loopShoots.length)].addBallToQue();
			this.ballCount ++;
		}*/

	//***** PHYSICS

		//TODO: side wall bounces

		//TODO: bottom edge death

	//***** SCORE

		this.timeSpentInLoop = 0;
		this.score = 0;

		this.addBallNextUpdate = false;

		this.nextFreeBall = 12;

		this.gameOver = false;

	//***** PADDLE

		this.paddleHeight = 4;//visual only
		this.paddleWidth = 100;
		this.paddleSpeed = 360;//pixels per second
		this.paddleChangeX;

		this.paddlePos = new Vector2D(canvas.width /2, canvas.height - 5);//Y is the TOP (as height is only visual)

		this.intro = true;

	}

	timeInLoop = function(){
		this.timeSpentInLoop ++;//keep count of how much time has been spent in loop (in ticks)
		this.score += this.ballCount;//one point per time spent in loop MULTIPLIED by the number of balls in the game at that time

		//exponentially growing time until you get more balls
		if(this.timeSpentInLoop >= this.nextFreeBall){
			this.nextFreeBall *= 2;
			this.addBallNextUpdate = true; //only one ball can be released each frame
		}
	}

	releaseBall = function(_posVec, _velVec){
		
		var ball = new Ball(_posVec.x, _posVec.y, this.ballSpeed, this.ballRadius);
		ball.setVelocity(_velVec.x, _velVec.y);
		this.ballsInPlay.push(ball);
	}

	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{

		if(this.gameOver || this.intro)
			return;

		//if we are suposed to be adding a ball do it
		if(this.addBallNextUpdate){
			this.loopShoots[Math.floor(Math.random() * this.loopShoots.length)].addBallToQue();
			this.ballCount ++;
			this.addBallNextUpdate = false;
		}

		

		//UPDATE PADDLE POSITION
		this.paddleChangeX =0;
		var prevPaddleX = this.paddlePos.x;

		if(inputHandler.leftPressed && !inputHandler.rightPressed){
			//MOVE PADDLE LEFT
			this.paddlePos.x -= this.paddleSpeed * _dt;
			//constrain to the left edge
			if(this.paddlePos.x - this.paddleWidth /2 < 0)
				this.paddlePos.x = this.paddleWidth /2;

			this.paddleChangeX = this.paddlePos.x - prevPaddleX;
		}
		else if(inputHandler.rightPressed && !inputHandler.leftPressed){
			//MOVE PADDLE RIGHT
			this.paddlePos.x += this.paddleSpeed * _dt;
			//constrain to the right edge
			if(this.paddlePos.x + this.paddleWidth /2 > canvas.width)
				this.paddlePos.x = canvas.width - this.paddleWidth /2;

			this.paddleChangeX = this.paddlePos.x - prevPaddleX;
		}


		//UPDATE LOOPSHOOTS
		//TODO: check if a ball moved into a collection point and collect it/them if they do
		for(var s = 0; s < this.loopShoots.length; s++){
			this.loopShoots[s].update(_dt);
		}

		//UPDATE FREE MOVING BALLS
		for(var b = 0; b < this.ballsInPlay.length; b++){
			this.ballsInPlay[b].update(_dt);
		}	

		//CHECK BALLS FOR OFF THE SCREEN
		
		for(var b = this.ballsInPlay.length -1; b >= 0; b--){
			if(this.ballsInPlay[b].pos.y > canvas.height){
				this.ballsInPlay.splice(b, 1);
				this.ballCount --;
			}
		}

		//CHECK FOR GAME OVER
		if(this.ballCount <= 0){
			this.gameOver = true;
		}
		
	}

	render = () =>{

		//clear the canvas each render
		context.clearRect(0, 0, canvas.width, canvas.height);

		//render player at current position each render
		context.save();

		if(this.gameOver){

			if(inputHandler.spacePressed){
				//location.reload();

				//clear score
				this.ballCount = 0;
				this.timeSpentInLoop = 0;
				this.score = 0;
				this.addBallNextUpdate = false;
				this.nextFreeBall = 12;
				this.gameOver = false;

				for(var b = 0; b < levels[this.levelIndex].ballsToStart; b++){
					this.loopShoots[Math.floor(Math.random() * this.loopShoots.length)].addBallToQue();
					this.ballCount ++;
				}

			}

			context.beginPath();
			context.textAlign = "center";

			context.font = "80px Luckiest Guy";
			context.fillStyle = '#8ac80b';
			context.fillText('GAME OVER', canvas.width /2, 270);

			context.fillStyle = 'white';

			context.font = "48px Luckiest Guy";
			context.fillText('LoopShoots', canvas.width /2, 100);
			context.fillText('SCORE:  ' + this.score, canvas.width /2, 450);

			context.font = "20px Arial";
			context.fillText('< SPACE BAR >    TO PLAY AGAIN', canvas.width /2, canvas.width - 50);
			context.fillText('by Stipple3D', canvas.width /2 + 80, 125);
			
		}
		else if(this.intro){
			if(inputHandler.spacePressed){

				//add number of balls requested to random loopShoot QUEs
				for(var b = 0; b < levels[this.levelIndex].ballsToStart; b++){
					this.loopShoots[Math.floor(Math.random() * this.loopShoots.length)].addBallToQue();
					this.ballCount ++;
				}

				this.intro = false;
			}

			context.beginPath();
			context.textAlign = "center";


			context.fillStyle = '#8ac80b';

			context.font = "80px Luckiest Guy";
			context.fillText('LoopShoots', canvas.width /2, 170);

			context.fillStyle = 'white';
			context.font = "32px Arial";
			context.fillText('by Stipple3D', canvas.width /2 + 120, 210);

			

			context.font = "18px Arial";
			context.fillText('1) MOVE LEFT / RIGHT  (ARROWS, WASD)', canvas.width /2, 340);
			context.fillText('2) KEEP AS MANY BALLS UP AS YOU CAN', canvas.width /2, 390);
			context.fillText('3) POINTS AND EXTRA BALLS FOR TIME SPENT', canvas.width /2, 440);
			context.fillText('IN THE  "LOOPSHOOTS"', canvas.width /2, 465);

			context.fillStyle = '#8ac80b';
			context.font = "24px Arial";
			context.fillText('< SPACE BAR >    TO START', canvas.width /2, 580);
		}
		else{

			//RENDER LOOPSHOOTS
			for(var s = 0; s < this.loopShoots.length; s++){
				this.loopShoots[s].draw();
			}

			//RENDER BALLS
			for(var b = 0; b < this.ballsInPlay.length; b++){
				this.ballsInPlay[b].draw();
			}


			//write directions on screen
			context.beginPath();

			context.fillStyle = 'white';
			context.font = "24px Luckiest Guy";

			context.fillText('SCORE:  ' + this.score, 20, 30);
			context.textAlign = "center";
			context.fillText('NEXT BALL:  ' + (this.nextFreeBall - this.timeSpentInLoop), canvas.width /2 - 10, 30);
			context.textAlign = "left";
			context.font = "14px Arial";
			context.fillText('by Stipple3D', canvas.width - 103, 47);

			context.font = "28px Luckiest Guy";
			context.fillText('LoopShoots', canvas.width - 180, 30);

			context.fillStyle = '#8ac80b';
			context.fillText('x  ' + this.ballCount, 30, 60);

			//DRAW PADDLE
			context.beginPath();
			context.fillStyle = '#8ac80b';
			context.strokeStyle = '#white';
			context.rect(this.paddlePos.x - this.paddleWidth /2, this.paddlePos.y, this.paddleWidth, this.paddleHeight);
			context.fill();
			context.stroke();
			
		}

		context.restore();
	}
}

