class LoopShoot{
	constructor(_level, _lsIndex, _ballRadius, _ballSpeed){

		//QUE to get in (if more than one ball reaches the collection point
		//		in one MOVE tick)
		//			- Collection is the only place they would bottle up
		this.qBalls = 0;

		this.ballRadius = _ballRadius;
		this.ballSpeed = _ballSpeed;

		//position of center of the loopshoot
		this.collectPosition = new Vector2D(levels[_level].loopshoots[_lsIndex].cpX, 
											levels[_level].loopshoots[_lsIndex].cpY);

		this.collectRadius = levels[_level].loopshoots[_lsIndex].cpRadius;

		this.grabRadius = this.ballRadius *2;

		//gravity of the collection point works in frame time
		//(starting testing for collection gravity at the collection radius per/second?)
		this.gravityRate = this.collectRadius / 4;//pixels per second to add to the balls in loopShoot's radius

		//array of Vector2D points
		this.points = [];

		//array of 'spaces' in the array (same number as points array)
		//	used for tracking where there are balls in the array
		this.spaces = [];

		for(var pt = 0; pt < levels[_level].loopshoots[_lsIndex].movePoints.length; pt++){
			//add a point to points array
			this.points[pt] = new Vector2D(levels[_level].loopshoots[_lsIndex].movePoints[pt].cX, 
											levels[_level].loopshoots[_lsIndex].movePoints[pt].cY);
			//add an false value (empty space) to the spaces array
			this.spaces[pt] = false;
		}

		//incoming angle is in degrees, adjust to Radians for use here
		//this.releaseAngle = levels[_level].loopshoots[_lsIndex].releaseAngle * (Math.PI/180);

		//TODO: calculate the release ange from the last two points!!!s
		// angle in radians

		/*this.points[this.points.length -1].x
		this.points[this.points.length -1].y

		this.points[this.points.length -2].x
		this.points[this.points.length -2].y*/
		
		//this.releaseAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		this.releaseAngle = Math.atan2(this.points[this.points.length -1].y - this.points[this.points.length -2].y, 
										this.points[this.points.length -1].x - this.points[this.points.length -2].x);


		//calculate the release X/Y (normalized) (will be adjusted by game)
		this.releaseVelocity = new Vector2D(this.ballSpeed * Math.cos(this.releaseAngle), this.ballSpeed * Math.sin(this.releaseAngle));


		//using DeltaTime to set the tick rate, so it is framerate independent
		this.tickRate = .1;//seconds

		//counter that will track the internal ticks of the loopShoot
		this.timeUntilTick = this.tickRate;

		this.ballInRange = false;

		if(this.qBalls == 0){
			this.ballInShoot = false;
		}
		else{
			this.ballInShoot = true;
		}
		

	}

	addBallToQue = function(){
		this.qBalls ++;
		this.ballInShoot = true;
	}

	handleTick = function(_dt){

		this.ballInShoot = false;


		//TODO: rom the end of the spaces array, move along/shoot each space toward the end

		for(var sp = this.spaces.length -1; sp >= 0; sp--){

			if(this.spaces[sp]){
				//SPACE IS OCCUPIED

				//add time in loop
				game.timeInLoop();

				if(sp == this.spaces.length -1){
					//LAST SPACE IS OCCUPIED, SHOOT A BALL FROM THE END
					this.spaces[sp] = false;

					//tell game to release a ball with a position and velocity based on the end point
					//		and the 'release' angle for this loopShoot
					game.releaseBall(this.points[sp], this.releaseVelocity);
					console.log('releasing ball from loopShoot');
				}
				else{
					//Any of the other spaces are occupied
					this.ballInShoot = true;

					//move it to the next space
					this.spaces[sp] = false;
					this.spaces[sp +1] = true;
				}
			}
		}

		//if the first space is free and we have a ball in the que, put the ball in a space
		if(!this.spaces[0]){
			//first space is empty
			if(this.qBalls > 0){
				//there is at least one ball in the QUE

				//remove a count from the QUE
				this.qBalls --;
				//make first space filled
				this.spaces[0] = true;

				this.ballInShoot = true;
			}
		}
	}

	update = function(_dt){

		//decrement the tick counter
		this.timeUntilTick -= _dt;
		//check if we need to run a tick
		if(this.timeUntilTick <= 0){
			//INCREASE the tickTimer by the rateValue
			//	(leaving any remaining overflow time, so it won't lose time)
			this.timeUntilTick += this.tickRate;
			//run a tick
			this.handleTick(_dt);
		}

		//ALWAYS DO THE BALL/GRAVITY CHECKS (not tick-based)

		//clear ball in range check each pass
		this.ballInRange = false;

		//for now, we are reading directly from the 'game' to have access to the balls in play
		for(var b = 0; b < game.ballsInPlay.length; b++){

			var diffVector = new Vector2D(this.collectPosition.x - game.ballsInPlay[b].pos.x,
										this.collectPosition.y - game.ballsInPlay[b].pos.y);
			
			var ballDist = Math.sqrt( (diffVector.x * diffVector.x) + (diffVector.y * diffVector.y) );

			//check if the ball is already close enough to the collection point to grab it
			if(ballDist <= this.collectRadius){
				
				if(ballDist <= this.grabRadius){
					//loopShoot is grabbing the ball

					//reset tick timer (so we wait a full tick before it starts moving through points)
					this.timeUntilTick = this.tickRate

					//remove the ball from the in play array
					game.ballsInPlay.splice(b, 1);

					//either put it in the QUE or the first 'space' in loopShoot
					if(!this.spaces[0]){
						this.spaces[0] = true;
					}
					else{
						this.qBalls ++;
					}
				}
				else{

					this.ballInRange = true;			


					//multiply the difVector by gravity rate
					//(this normailzes and then multiplies)
					diffVector.setMag(this.gravityRate);

					//apply that gravity to the ball
					game.ballsInPlay[b].addForce(diffVector.x, diffVector.y);
					//console.log('diffVector: ' + diffVector.x + ', ' + diffVector.y);
				}
			}
		}

	}

	draw = function(){

		context.save();

		if(this.ballInShoot){
			//DRAW BG LINE BETWEEN ALL POINTS (THICK AS A TUBE)
			context.beginPath();
			context.lineWidth = 25;
			context.lineCap = "round";
			context.strokeStyle = '#555';
			context.moveTo(this.collectPosition.x, this.collectPosition.y);
			for(var pt = 0; pt < this.points.length; pt++){
				context.lineTo(this.points[pt].x, this.points[pt].y);
			}
			context.stroke();

			//2nD stroke to fill in and make a border
			context.beginPath();
			context.lineWidth = 21;
			context.lineCap = "round";
			context.strokeStyle = '#333';
			context.moveTo(this.collectPosition.x, this.collectPosition.y);
			for(var pt = 0; pt < this.points.length; pt++){
				context.lineTo(this.points[pt].x, this.points[pt].y);
			}
			context.stroke();
		}

		



		//DRAW COLLECTION POINT
		/*context.beginPath();
		context.fillStyle = 'yellow';
		context.arc(this.collectPosition.x, this.collectPosition.y, 3, 0, Math.PI *2);
		context.fill();*/


		//DRAW SPACES (empty or full)
		for(var sp = 0; sp < this.spaces.length; sp++){
			context.beginPath();
			if(this.spaces[sp]){
				context.fillStyle = '#777';
				context.arc(this.points[sp].x, this.points[sp].y, this.ballRadius, 0, Math.PI *2);
				context.fill();
			}				
			else{
				/*context.fillStyle = '#222';
				context.arc(this.points[sp].x, this.points[sp].y, this.ballRadius, 0, Math.PI *2);
				context.fill();*/
			}
			
		}
		
		
		//DRAW COLLECTION POINT RADIUS LINE (dashed)
		if(this.ballInRange){
			context.beginPath();
			context.lineWidth = 1;
			context.fillStyle = '#444';
			context.strokeStyle = '#666';
			context.setLineDash([10, 10]);
			context.arc(this.collectPosition.x, this.collectPosition.y, this.collectRadius, 0, Math.PI *2);
			context.stroke();
			context.fill();
		}
		

		context.restore();
	}
}